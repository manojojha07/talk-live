import express from 'express'
import 'dotenv/config'


const app = express();

const PORT = process.env.PORT || 5000;



app.get('/', (req , res) => {
res.status(200).json({msg:"server live backend 123 !"});
})




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})