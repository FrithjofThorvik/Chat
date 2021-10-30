import express from "express";
import socketIO from "socket.io";
import http from "http";
import db from "./models";
// import { runExpress } from "./servers/express";
// import { runSocket } from "./servers/socket";
import path from "path";
import cors from "cors";

import UserRouter from "./routes/user";

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

// Configure express
app.use(express.json()); // Enable json format
app.use(express.static(path.join(__dirname, "../build")));
app.use(
	cors({
		origin: ["http://localhost:3000", "https://chat-frithjof.herokuapp.com"],
	})
);

// Add express routes
app.use("/api/user", UserRouter); // User route
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build", "index.html"));
});

db.sequelize
	.sync()
	.then(() => {
		httpServer.listen(PORT, (): void => {
			console.log(`Server running on port ${PORT}...`);
		});
	})
	.catch((err: any) => {
		console.log(err);
	});

// Run express & socket servers
io.on("connection", (socket) => {
	console.log("Socket: ", socket.id);

	socket.on("join_room", (room: string) => {
		socket.join(room);
		console.log(`User [${socket.id}] joined ${room}`);
	});

	socket.on("send_message", (payload: any) => {
		socket.to(payload.room).emit("receive_message", payload.message);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected...");
	});
});
// runExpress(app, httpServer, PORT);
// runSocket(io);
