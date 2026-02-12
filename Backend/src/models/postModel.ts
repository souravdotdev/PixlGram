import mongoose from "mongoose";
import * as z from "zod";

interface postSchemaInterface {
    caption: string
    imgUrl: string
    userId: mongoose.Schema.Types.ObjectId
}

const postSchema = new mongoose.Schema<postSchemaInterface>({
    caption:{
        type: String,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
    userId:{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    }
}, {timestamps: true})

export const postCreationSchema: z.ZodObject = z.object({
    caption: z.string(),
    imgUrl: z.string(),

}) 

const postModel = mongoose.model("posts", postSchema);