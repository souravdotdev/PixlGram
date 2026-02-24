import { Request, Response } from "express";
import {
  loginSchema,
  registerUserSchema,
  userModel,
} from "../models/userModel";
import bcrypt from "bcrypt";
import generateOtp from "../services/otpService";
import jwt from "jsonwebtoken";

export async function registerUserController(req: Request, res: Response) {
  const { username, email, password, profileImage, bio } = req.body;

  const result = registerUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Required fields need to be filled",
    });
  }

  const exisitingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (exisitingUser) {
    res.status(409).json({
      message: "User already exists",
    });
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
  });

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
      profileImage: newUser.profileImage,
      bio: newUser.bio,
    },
  });
}

export async function verifyController(req: Request, res: Response) {
  const { otp } = req.body;
  const email = req.params.email;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(409).json({
      message: "User doesnot exist",
    });
  }

  if (otp != user.otp || Date.now() > user.otpExpiry.getTime()) {
    return res.status(400).json({
      message: "OTP expired",
    });
  }

  await userModel.findOneAndUpdate({ email }, { isVerified: true });

  return res.status(200).json({
    message: "User verified successfully",
  });
}

export async function loginController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Required fields need to be filled",
    });
  }

  const user = await userModel.findOne({ $or: [{ username }, { email }] }).select("+password");

  if (!user) {
    return res.status(409).json({
      message: "User not found",
    });
  }

  if (user.isVerified == false) {
    return res.status(401).json({
      message: "User not verified",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    return res.status(400).json({
      message: "JWT secret required",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: true,
  });

  res.status(200).json({
    message: "User LoggedIn successfully",
    user: {
      email: user.email,
      username: user.username,
    },
  });
}

export async function getMeController(req: Request, res: Response) {
  const userId = req.user?.id;

  const user = await userModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User details fetched successfully",
    user: {
      email: user?.email,
      username: user?.username,
      profileImage: user?.profileImage,
      bio: user?.bio,
    },
  });
}
