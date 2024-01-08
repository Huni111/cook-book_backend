import mongoose from "mongoose";

const connectDB = async() => {
    try{
  await mongoose.connect(process.env.DB_LINK);
  console.log("Database Connected!")
    }catch(err) {console.log("ERROR in connection DB:" +err)};
}

export {connectDB}