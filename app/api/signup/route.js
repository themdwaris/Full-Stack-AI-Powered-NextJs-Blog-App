import dbConnect from "@/config/db/dbConnect";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();
  try {
    const { name, email, password } = await req.json();
    if (!name?.trim() || !email || !password?.trim()) {
      return NextResponse.json({
        message: "All fields are required",
        success: false,
      });
    }
    const isUserAlreadyExists = await UserModel.findOne({ email });
    if (isUserAlreadyExists) {
      return NextResponse.json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({
      message: "Sign up successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error.message || error);
    return NextResponse.json({ message: error.message || error });
  }
}
