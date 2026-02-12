import { Request , Response } from "express";

export function createPostController(req: Request, res: Response){
    console.log(req.body, req.file);
}