import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

const socket = io(SOCKET_URL, {
    withCredentials: true,
});

export default socket;