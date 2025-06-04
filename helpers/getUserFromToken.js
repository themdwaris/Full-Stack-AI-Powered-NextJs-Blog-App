import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/userModel";
import dbConnect from "@/config/db/dbConnect";

export async function getUserFromToken(req) {
  await dbConnect();
  try {
    const token = req.cookies.get("userToken")?.value;
    if (!token) {
      return NextResponse.json({
        message: "User is Unauthorized",
        success: false,
      });
    }
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decodeToken?.id).select("-password");
    
    if (!user) return null;

    return user;

  } catch (error) {
    console.log("Failed to get login user from token:", error);
    return NextResponse.json({
      message: error?.message || error,
      success: false,
    });
  }
}
