import dotenv, { config } from 'dotenv'
import { Inngest } from 'inngest';

dotenv.config();
dotenv.config({quiet :true});

export const ENV = { 
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    NODE_ENV : process.env.NODE_ENV,
    CLIENT_URL : process.env.CLIENT_URL,
    INNGEST_SIGNIN_KEY :process.env.INNGEST_SIGNIN_KEY,
    INNGEST_EVENT_KEY :process.env.INNGEST_EVENT_KEY,
    STREAM_API_SECRET : process.env.STREAM_API_SECRET

}