import  { StreamChat } from 'stream-chat';
import  { StreamClient } from '@stream-io/node-sdk';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("STREAM_API_KEY ||  STREAM_API_SECRET is missing!");  
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this is chat feauture
export const streamClient = new StreamClient(apiKey, apiSecret) //this will used for video calls


export const upsertStreamUser = async(userData) =>{
    try {
        await chatClient.upsertUser(userData)
        console.log("Sream user upserted successfully: ", userData);
        return userData;
    } catch (error) {
        console.log("stream function problam error!"); 
    }
}


export const deleteStreamUser = async(userId) =>{
    try {
        await chatClient.deleteUser(userId)
        console.log("Sream user delte successfully: ", userId);
        
    } catch (error) {
        console.log("stream function delete problam error!"); 
    }
}

// todo : add another method to Genration token
