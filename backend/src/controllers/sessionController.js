import { readFileAsArrayBuffer } from 'stream-chat';
import { chatClient, streamClient } from '../configs/stream.js'
import Session from '../models/Session.js'

export async function  createSession(req, res) {
    try {
        const { problem , difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problem || !difficulty){
            return res.status(400).json({message: "Problem and Diffculty are required!"})
        }

        //genrate a uniue call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
      
        // create session id db
            const session = await Session.create({
                problem,
                difficulty,
                host:userId,
                callId
            });

            //   create stream video call
           await streamClient.video.call('default', callId).getOrCreate({
            data:{
                custom:{problem, difficulty, sessionId:session._id.toString()}
            },
           });


        //    chat messages
      const channel = chatClient.channel("messaging", callId,{
            name: `${problem} Session`,
            created_by_id:clerkId,
            members:[clerkId]
        });

        await channel.create();
        res.status(201).json({session});

    } catch (error) {
        console.log("Error in createSession controller: ", error.message);
        res.status(500).json({message:"Internal Serverr Error :> "})
    }
}

export async function getAvtiveSessions (_ , res) {
    try {
      const sessions = await Session.find({status: "active"})
      .populate("host", "name profileImage email clerkId")
      .sort({createdAt: -1})
      .limit(20);

      res.status(200).json({sessions});
    } catch (error) {
         console.log("Error in getActiveSession controller: ", error.message);
        res.status(500).json({message:"Internal Serverr Error :> "})
    }
}

export const getMyRecentSessions = async (req, res) => {
    try {
        const userId = req.user._id;

        // get session ehre user is either host or participant
      const sessions = await Session.find({
            status: 'completed',
            $or : [{host:userId}, {participant:userId}],
        })
        .sort({createdAt : -1}).limit(20);
        res.status(200).json({sessions})

    } catch (error) {
         console.log("Error in getMySession controller: ", error.message);
        res.status(500).json({message:"Internal Serverr Error :> "})
    }
}

export const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await Session.findById(id)
        .populate("host", "name email profileImage clerkId")
        .populate('participant', 'name email profileImage clerkId')

        if(!session) return res.status(404).json({message: "Session Not Found!"});
       res.status(200).json({session});

    } catch (error) {

         console.log("Error in getMySessionId controller: ", error.message);
        res.status(500).json({message:"Internal Serverr Error :> "})
    }
}

export const joinSession = async (req, res) => {
    try {
        const  { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.find(id)

        if(!session) return res.status(404).json({message : "Session not found!"});

        // check if session is already full - has a particepent 
        if(session.participant) return res.status(409).json({message: "Session is full "});

        if(session.status !== 'active'){
         return res.status(400).json({message: "cannot join a complete session"})
        }
             
       if(session.host.toString() === userId.toString()){
        return res.status(400).json({message: "host cannot join tehere own session as particepant"})
       }

        session.participant = userId;
        await session.save();

        const channel = chatClient.channel('messaging', session.callId)
        await channel.addMembers([clerkId]);

        res.status(200).json({session});

    } catch (error) {

         console.log("Error in joinSession controller: ", error.message);
        res.status(500).json({message:"Internal Serverr Error :> "})
    }
}

export const endSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);

        if(!session) return res.status(404).json({message: "Session not found"});

        // check if user the host
        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({message:  "Only the host can end the session"});
        }
        
        // check if session is complited
        if(session.status === 'completed'){
            return res.status(400).json({message: "session is allready completed!"});
        }

       

        // delete the stream viddeo call
        const call = streamClient.video.call('default', session.callId)
        await call.delete({hard:true});

        // delete stream chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

         session.status = 'completed'
        await session.save();
        
        res.status(200).json({session, message :"Session ended Successfully"})

    } catch (error) {
         console.log("Error in endSession controller: ", error.message);
        res.status(500).json({message:"Internal Serverr Error :> "})
    }
}