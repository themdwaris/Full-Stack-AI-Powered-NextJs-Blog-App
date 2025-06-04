import dbConnect from "@/config/db/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.set("userToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge:new Date(0)
    });
    return response 

  } catch (error) {
    console.log("Failed to logout:", error);
    return NextResponse.json({
      message: error?.message || error,
      success: false,
    });
  }
}
