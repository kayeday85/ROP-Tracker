import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  passwordHash: { type: String },
});

export default mongoose.model("User", UserSchema);