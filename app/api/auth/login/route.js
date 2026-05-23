import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) return Response.json({ error: "User not found" }, { status: 400 });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return Response.json({ error: "Invalid password" }, { status: 400 });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json({ token }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}