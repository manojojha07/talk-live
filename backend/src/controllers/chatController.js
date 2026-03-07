import { chatClient } from "../configs/stream.js";



export async function getStreamToken(req, res) {
    try {
        // use clerkId for Stream (not mondob._id) => i shoud match the id we have in the stream dashboard
        const token = chatClient.createToken(req.user.clerkId);

        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image,
        })
    } catch (error) {
        console.log("error getstreamtoken function controller");
        
        res.status(500).json({message: "Internal Server Error"});
    }
}