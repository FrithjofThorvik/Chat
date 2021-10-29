import express from "express";
import cors from "cors";
import db from "./models";
import path from "path";
import UserRouter from "./routes/user";

// Instantiate express
const app = express();
const PORT = process.env.PORT || 3001;

// Configure express
app.use(express.json()); // Enable json format
app.use(express.static(path.join(__dirname, "../build")));
app.use(
	cors({
		origin: ["http://localhost:3000", "http://spotify-prime.herokuapp.com"],
	})
);

// Add express routes
app.use("/api/user", UserRouter); // User route
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start express sercer
db.sequelize
	.sync()
	.then(() => {
		app.listen(PORT, (): void => {
			console.log(`Server running on port ${PORT}...`);
		});
	})
	.catch((err: any) => {
		console.log(err);
	});
