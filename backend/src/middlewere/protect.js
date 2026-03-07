import { requireAuth } from '@clerk/express'
import User from '../models/User.js';

export const protectRoute = [
    requireAuth({signInUrl: "/sign-in"}),
    async(req, res, next) => {
     try {
           const clerkId = req.auth().userId;
        if(!clerkId) return res.status(401).json({msg: "Unauthorized - invalid token!"})

            // find user in db by clerk id
           const user = await User.findOne({clerkId});
           if(!user) return res.status(404).json({msg: "User not found!"});

           //attach user to req
           req.user= user;

           next();
     } catch (error) {
       console.error("Error protectRoute message :", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
     }
    }
]