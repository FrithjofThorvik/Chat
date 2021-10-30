import express, { Express } from "express";
import db from "../models";
import http from "http";
import path from "path";
import cors from "cors";

import UserRouter from "../routes/user";

export const runExpress = (
	app: Express,
	httpServer: http.Server,
	PORT: string
) => {
	// Configure express
	app.use(express.json()); // Enable json format
	app.use(express.static(path.join(__dirname, "../build")));
	app.use(
		cors({
			origin: ["http://localhost:3000", "http://chat-frithjof.herokuapp.com"],
		})
	);

	// Add express routes
	app.use("/api/user", UserRouter); // User route
	app.get("/*", (req, res) => {
		res.sendFile(path.join(__dirname, "../../build", "index.html"));
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
};
