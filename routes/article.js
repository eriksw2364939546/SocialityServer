import express from "express";
import { createArticle, createComment, controllLike, getAllArticle } from "../controllers/article.js";
import uploadImage from "../middleware/uploadImage.js";
import authMiddleware from "../middleware/auth.js";
const articleRouter = express.Router()

articleRouter.get("/", getAllArticle)
articleRouter.post("/create", authMiddleware, uploadImage.single('image'), createArticle)
articleRouter.post("/add-comment", authMiddleware, createComment)
articleRouter.post("/like", authMiddleware, controllLike)

export default articleRouter
