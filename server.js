import dotenv from 'dotenv';
dotenv.config();
console.log("MONGODB_URI from env:", process.env.MONGODB_URI);
import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
await connectDB();
console.log("Connected to MongoDB");
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
