import express from "express"
import { createPostController, getFeedController, getPostController, getPostDetailsController, likePostController } from "../controllers/postController";
import upload from "../middlewares/multerConfig";
import authMiddleware from "../middlewares/authMiddleware";

export const postRouter = express.Router();

postRouter.post("/", upload.single("image") , authMiddleware ,createPostController);
postRouter.get("/", authMiddleware ,getPostController);
postRouter.get("/details/:postId", authMiddleware ,getPostDetailsController);
postRouter.post("/like/:postId", authMiddleware, likePostController);
postRouter.get("/feed", authMiddleware, getFeedController);