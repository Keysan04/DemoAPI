import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log("check the url ");
    }
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn && console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
