import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, name, password, phoneNumber } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser: IUser = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error in registering the user",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    // Chekc if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error in logging in", error });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user profile",
      error,
    });
  }
};
