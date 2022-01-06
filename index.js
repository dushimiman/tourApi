import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose"
import userRouter from "./src/routes/userRoutes"
import tourRoutes from "./src/routes/tourRoutes";


dotenv.config({path:"./.env"})
const app = express();
app.use(bodyParser.json()); 
app.use("/user",userRouter);
app.use("/tour",tourRoutes);
app.use("/",(req,res)=> res.status(200).json({
    message:"this is Tour API"
}

));
const dburl =process.env.DATABASE;
mongoose.connect(dburl, ).then(()=>console.log("database connected successfull"));

app.listen(4040,()=>{
    console.log(`server is running on port 4040`)
})

export default app;