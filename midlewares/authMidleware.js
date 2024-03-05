import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"

const protect = asyncHandler(async(req,res,next) => {
    let token;
    let secret;

    token = req.cookies.jwt;
    secret = process.env.SECRET;

    if(token) {
        console.log(token, secret);
        
        try {
            const isTranslated = jwt.verify(token, secret);

            req.user = await User.findById(isTranslated.userId, "-password");

            next();
        } catch (err) {
            console.log(err);
            res.status(401);
        }
    } else {
        res.status(401);
        throw new Error("Not authorized!");
    }

    // res.json({
    //     kulcs: token,
    //     titok: secret
    // });
})


export default protect;
