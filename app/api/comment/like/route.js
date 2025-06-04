import dbConnect from "@/config/db/dbConnect";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import CommentModel from "@/models/commentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const user = await getUserFromToken(req);
    console.log("line 10:", user);

    if (!user || !user?._id) {
      return NextResponse.json({
        message: "User not authorized",
        success: false,
      });
    }

    const { commentId } = await req.json();
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return NextResponse.json({
        message: "Comment not found",
        success: false,
      });
    }

    //Check user is like already or not
    const userId = user?._id?.toString();
    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      //Unlike
      //   console.log("unlike");

      comment.likes = comment?.likes?.filter((id) => id?.toString() !== userId);
    } else {
      comment?.likes?.push(userId);
    }

    await comment.save();

    return NextResponse.json({
      likesCount: comment?.likes?.length,
      liked: !alreadyLiked,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}
