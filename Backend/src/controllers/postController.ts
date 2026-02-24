import { Request , Response } from "express";
import uploadFileToImageKit from "../services/imageKitService";
import jwt from "jsonwebtoken";
import { postModel } from "../models/postModel";
import { likeModel } from "../models/likeModel";

export async function createPostController(req: Request, res: Response){
    if(!req.file || !req.body){
        return res.status(400).json({
            message: "File and Caption is required",
        })
    }

    const uploadResponse = await uploadFileToImageKit(req.file.buffer, req.file.originalname);

    const newPost = await postModel.create({
        caption: req.body.caption,
        imgUrl: uploadResponse.url,
        userId: req.user?.id,
    } as any)

    return res.status(201).json({
        message: "New post created successfully",
        newPost
    })
    
}

export async function getPostController(req: Request, res: Response){


    const userId = req.user?.id;

    const posts = await postModel.find({userId: userId} as any)

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })

}

export async function getPostDetailsController(req: Request, res: Response){
    const userId = req.user?.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "No posts found"
        })
    }

    const isValidUserAccessingPost = post?.userId.toString() === userId;

    if(!isValidUserAccessingPost){
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}

export async function likePostController(req: Request, res: Response){
    const user = req.user?.username;
    const postId = Array.isArray(req.params.postId) ? req.params.postId[0] : req.params.postId;

    if(!postId || !user){
        return res.status(400).json({
            message: "Post ID and user is required"
        })
    }

    const isPostExists = await postModel.findById(postId);

    if(!isPostExists){
        return res.status(400).json({
            message: "The post you are trying to like doesnot exist"
        })
    }

    const isUserAlreadyLikedPost = await likeModel.findOne({post: postId, user: user} as any);

    if(isUserAlreadyLikedPost){
        return res.status(400).json({
            message: "You cannot like a post more than once"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: user
    } as any)

    res.status(201).json({
        message: "You liked the post",
        like
    })
}

export async function getFeedController(req: Request, res: Response){
    const user = req.user;

    const posts = await Promise.all((await postModel.find().populate("userId").lean())
        .map(async (post: any) => {
            const isLiked = await likeModel.findOne({
                user: user?.username,
                post: post._id
            } as any)

            post.isLiked = Boolean(isLiked)
            return post
        }))
    if(!posts){
        return res.status(400).json({
            message: "No posts available"
        })
    }

    return res.status(200).json({
        message: "All posts fetched successfully",
        posts
    })
}