import mongoose from "mongoose";

interface likeSchemaInterface{
    post: mongoose.Schema.Types.ObjectId
    user: string
}

const likeSchema = new mongoose.Schema<likeSchemaInterface>({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post is required for liking a post"]
    },
    user:{
        type: String,
        required: [true, "user is required for liking a post"]
    }
}, {timestamps: true})

likeSchema.index({post: 1, user: 1}, {unique: true});

export const likeModel = mongoose.model("likes", likeSchema);