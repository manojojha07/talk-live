import mongoose  from 'mongoose'

export const  connectToDatabase = async() => {
try {

    if(!process.env.MONGO_URI){
        console.log("Url not found in Environment...");
        
    }
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Db Connnected Success! ");

} catch (error) {
       console.error(" ❌ Error connecting to DB:", error);

}
}