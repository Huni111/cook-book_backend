import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"
import router from './routes/userRoutes.js'
import routerR from './routes/recipeRoutes.js'
import { connectDB } from "./config.js";
import { notFound, errorHandler } from "./midlewares/errorMidleware.js";
import User from "./models/userModel.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT

connectDB()


app.use(cors({
    origin: 'https://cb-frontend-one.vercel.app',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
  }))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use("/api/recipe", routerR)
app.use("/api/user", router)


app.get('/',(req,res) => {
    res.status(200).send('Server is ready!!!')
})








app.use(notFound);

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server is running on port: ${port}`))
