import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { serve } from 'inngest/express'
import { connectToDatabase } from './src/configs/db.js';
import { functions, inngest } from './src/configs/inngest.js';


const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.use('/api/inngest' , serve({client: inngest, functions}))

app.get('/', (req, res) => {
    res.status(200).json({ msg: "server live backend 123 !" });
})



const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () =>  console.log(`🧸 :>  http://localhost:${PORT}`))
    } catch (error) {
console.log("Error string the server :) ");

}
}

startServer();

