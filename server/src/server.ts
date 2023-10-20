import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import session from "express-session";
// import connectMongo from 'connect-mongodb-session';

import connectToMongo from "./db";
import otpRoutes from "./routes/otp";
import authRoutes from "./routes/auth";

const app = express();
const port = process.env.PORT || 9000;

const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectToMongo();

import "./models/Token";
import "./models/User";
import "./models/Collection";

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server started successfully at port ${port}.`);
});