import mongoose from "mongoose";
import { config } from "dotenv";
import app from "./app";

// Load environment variables
config();

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Error in connecting to DB");
    process.exit(1);
  }
};

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await connectDB();
});
