import dbConnect from "@/config/db/dbConnect";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not found!",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Wrong password", success: false });
    }
    const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    const safeUser = user.toObject();
    delete safeUser?.password;
    const response = NextResponse.json({
      safeUser,
      message: "Login successfully!",
      success: true,
    });

    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set("userToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.log("Failed to login:", error);
    return NextResponse.json({
      message: error?.message || error,
      success: false,
    });
  }
}
