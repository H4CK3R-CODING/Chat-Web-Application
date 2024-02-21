import mongoose from "mongoose";

const conectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to the MongoDb");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};


export default conectToMongoDB;