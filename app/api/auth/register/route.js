import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  try {
    const user = await User.create({ name, email, password });

    const res = NextResponse.json({ message: "User registered", user }, { status: 201 });

    // CORS HEADERS
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 200 });

  // CORS HEADERS
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return res;
}
