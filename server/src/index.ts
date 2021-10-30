import express from "express";
import socketIO from "socket.io";
import http from "http";
import { runExpress } from "./servers/express";
import { runSocket } from "./servers/socket";

const PORT = process.env.PORT || "3001";

// Instantiate express, http, and socket io
const app = express();
const httpServer = new http.Server(app);
const io = new socketIO.Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

runExpress(app, httpServer, PORT);
runSocket(io);
