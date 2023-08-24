import App from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const serverInstance = new App();

const port = process.env.PORT || 8001;

async function runServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    serverInstance.listen(port as number);
  } catch (error) {
    console.log(error);
  }
}

runServer();
