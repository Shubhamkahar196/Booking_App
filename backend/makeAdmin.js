import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      process.exit(1);
    }
    user.isAdmin = true;
    await user.save();
    console.log(`User ${email} is now an admin.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const email = process.argv[2];
if (!email) {
  console.log("Please provide an email as an argument.");
  process.exit(1);
}

makeAdmin(email);
