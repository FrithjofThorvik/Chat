import express from "express";
import { CreateOrUpdateUser } from "../controllers/user";

// Instantiate router
const UserRouter = express.Router();

// Routes
UserRouter.post("/", CreateOrUpdateUser);

// Export router
export default UserRouter;
