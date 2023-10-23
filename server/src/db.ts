import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/cloudmingle?retryWrites=true&w=majority";

const connectToMongo = () => {
  return mongoose
    .connect(mongoUri!)
    .then(() => {
      console.log(`Connected to MongoDB successfully.`);
    })
    .catch((error) => {
      console.log(`MongoDB connection error: ${error.message}`);
    });
};

export default connectToMongo;