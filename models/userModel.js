import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe"
    }]
},{
    timestamps: true
}
);

userSchema.pre('save', async function(next) {

    if(!this.isModified('password')){return next()}

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);

        this.password = hash

    }catch (err) {
        console.log('ERROR!:' + err)
    }

})

userSchema.methods.matchPassword = async function (inpPassword) {
    return  await bcrypt.compare(inpPassword, this.password)
}

const User = mongoose.model('User', userSchema)


export default User
