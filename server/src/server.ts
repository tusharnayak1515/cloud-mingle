import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from 'connect-mongodb-session';

import connectToMongo from "./db";
import otpRoutes from "./routes/otp";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import collectionRoutes from "./routes/collection";
import inviteRoutes from "./routes/invite";
import starredRoutes from "./routes/starred";

const app = express();
const MongoDBStore = connectMongo(session);
const port = process.env.PORT || 9000;

const FRONTEND_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

const store = new MongoDBStore({
    uri: process.env.MONGO_URI || "mongodb://0.0.0.0:27017/cloudmingle?retryWrites=true&w=majority",
    collection: 'sessions',
});

store.on('error', (error) => {
    console.error('MongoDB session store error:', error);
});

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));

app.use(
    session({
        secret: "expenso",
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

import "./passport";

connectToMongo();

import "./models/Token";
import "./models/User";
import Collection from "./models/Collection";
import "./models/Invite";
import "./models/Starred";
import { ICollection } from "./entities/entityInterfaces";

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/starred", starredRoutes);

const server = app.listen(port, () => {
    console.log(`Server started successfully at port ${port}.`);
});

const io = require("socket.io")(server, {
    pingTimeOut: 60000,
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

let users: any[] = [];
const userSocketMap = new Map();

function getUserDetails(socketId: any) {
    console.log(userSocketMap.entries());
    return userSocketMap.get(socketId);
}

io.on("connection", (socket: any) => {
    console.log("Connected to socket.io");
    socket.on("setup", (collectionId: any) => {
        console.log("collectionId: ",collectionId);
        socket.join(collectionId);
    });

    socket.on("collection-updated", async (collectionId: string | null) => {
        console.log("collectionId: ",collectionId);
        const collection: ICollection | null = await Collection.findById(collectionId);
        if (collection) {
            io.to(collectionId).emit('collection-changed', collection?._id.toString());
        }
        io.emit('collections-changed', collection?._id.toString());
    });

    socket.on("logout", (collectionId: any) => {
        socket.leave(collectionId);
    });

    socket.off("setup", (collectionId: any) => {
        console.log("socket.off: ", collectionId);
        socket.leave(collectionId);
    });

    socket.on("disconnect", () => {
        const collectionId = getUserDetails(socket.id);
        socket.leave(collectionId);
    });
});