import { Request, Response } from "express";
import { registerUserSchema, userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import generateOtp from "../helpers/otp";

export async function registerUserController(req: Request, res: Response) {
  const { username, email, password, profileImage, bio } = req.body;

  const result = registerUserSchema.safeParse(req.body);

  if(!result.success){
    return res.status(400).json({
        message: "Required fields need to be filled",
    })
  }

  const exisitingUser = await userModel.findOne({ $or: [{ email }, { username }] });

  if(exisitingUser){
    res.status(409).json({
        message: "User already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
    profileImage,
    bio,
    otp: generateOtp(),
    isVerified: false,
  })

  return res.status(201).json({
    message: "User registered successfully",
    user: {
        username,
        email,
        profileImage,
        bio
    }
  })

}
