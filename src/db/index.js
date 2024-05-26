import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance =
      await mongoose.connect(`${process.env.MONGODB_URI}
    /${DB_NAME}`);
    console.log(
      `\n MongoDB connected By Mohd Qaisar Moin !! DB Host:                     
       ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection ERROR db/Index.js: ", error);
    process.exit(1);
    // process.exit() jo current process chal rahi hai usko exit karde ga
  }
};

export default connectDB;

// ---------> Is file mein bus database connection hua hai
