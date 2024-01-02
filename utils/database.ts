import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) console.log("Database is connected");
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
    }
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "share_prompt" });

    isConnected = true;
    console.log("Database is connected");
    
  } catch (error) {
    console.log(error);
  }
  return;
}