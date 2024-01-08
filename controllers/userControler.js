import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc authorize the user
//route: POST api/user/auth
//@access: public
const authUser = asyncHandler(async(req,res) => {
const {email, password} = req.body;

const user = await User.findOne({email});

if(user &&(await user.matchPassword(password))){
    generateToken(res, user._id);

    console.log("Loged in!!!")
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    })
}else{
    res.status(401);
    console.log(await user.matchPassword(password))
    throw new Error("Invalid email, or password!")
}

})

//@desc register the user
//route: POST api/user/
//@access: public
const regUser = asyncHandler(async(req,res) => {
const {name, email, password} = req.body
const userExist = await User.findOne({ email })

if(userExist) {

    res.status(400) 
    
    throw Error("user already exist")
}

const user = await User.create({
    name,
    email,
    password
})

if(user) {
generateToken(res, user._id)    

res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email
})

}else{
    res.status(400)
}




})

//@desc logout the user
//route: POST api/user/logout
//@access: public
const logoutUser = asyncHandler(async(req,res) => {

    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(202).json({message: "Loged out user!"})
})

//@desc find the user
//route: GET api/user/profile
//@access: private
const getUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else{
        res.status(404);
        throw new Error("User not found!")
    }




})

//@desc update the user
//route: PUT api/user/profile
//@access: private
const updateUser = asyncHandler(async(req,res) => {

    const user = await User.findById(req.user._id)

    if(user) { 
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email;
    

    if(req.body.password) {
        user.password = req.body.password;
    }
    
    const updatedData = await user.save();


    res.json({
        id: updatedData._id,
        name: updatedData.name,
        email: updatedData.email
    })
}else{
    res.status(404);
    throw new Error("User not found!")
}

})

export {
    authUser,
    regUser,
    logoutUser,
    getUser,
    updateUser

}