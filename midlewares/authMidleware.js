import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"

const protect = asyncHandler(async(req,res,next) => {
    let token;

    token = req.cookies.jwt;

    if(token) {
        try{
            const isTranslated = jwt.verify(token, process.env.SECRET)

            

            req.user = await User.findById(isTranslated.userId, "-password")

            

            next();
        }catch (err) {
            console.log(err)
            res.status(401);
        }
    }else{
        res.status(401);
        throw new Error("Not authorized!")

    }


})

export default protect;