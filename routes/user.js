import express from "express";
import { createUser, loginUser, authUser } from "../controllers/user.js";
import authMiddleware from "../middleware/auth.js";
const userRouter = express.Router()

userRouter.post("/register", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/auth", authMiddleware, authUser)

export default userRouter
