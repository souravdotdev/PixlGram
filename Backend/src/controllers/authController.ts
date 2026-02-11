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

  const otpExpiryTime = new Date(Date.now() + 5 * 60 * 1000);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
    profileImage,
    bio,
    otp: generateOtp(),
    otpExpiry: otpExpiryTime,
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

export async function verifyController(req: Request, res: Response){
  const {email, otp} = req.body

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(409).json({
      message: "User doesnot exist",
    })
  }

  if(otp != user.otp || Date.now() > user.otpExpiry.getTime()){
    return res.status(400).json({
      message: "OTP expired"
    })
  }

  await userModel.findOneAndUpdate({email},{isVerified: true});

  return res.status(200).json({
    message: "User verified successfully",
  })
  
}
