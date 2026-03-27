import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import applicationRoutes from "./routers/applicationRoutes.js";
import userRoutes from './routers/userRoutes.js'
import statusRoutes from './routers/statusRoutes.js'

dotenv.config();

const app=express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-application-tracker-two-ecru.vercel.app"
  ], // your React app
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('mongodb connected')
)

app.use('/applications',applicationRoutes)
app.use('/users',userRoutes)

app.use('/status',statusRoutes)

const PORT= process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('connected to mongo'); 
  console.log(`server running on address http://localhost:${PORT}`);
  
})
