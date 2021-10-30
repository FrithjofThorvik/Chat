import socketIO from "socket.io";
import { IMessage } from "../types/interfaces";

export const runSocket = (io: socketIO.Server) => {
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
};
