import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected ✅");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/blog-app`);
  } catch (error) {
    console.log("Failed to connect database ❌");
  }
};

export default dbConnect;
