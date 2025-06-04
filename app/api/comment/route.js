import dbConnect from "@/config/db/dbConnect";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import CommentModel from "@/models/commentModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const blogId = req?.nextUrl?.searchParams?.get("blogId");

    const comments = await CommentModel.find({ blogId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ comments, success: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "Failed to fetch comments",
      success: false,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized", success: false });

    const { comment, blogId } = await req.json();
    if (!comment?.trim()||!blogId)
      return NextResponse.json({
        message: "Please write a comment",
        success: false,
      });

    const newComment = new CommentModel({
      text: comment,
      blogId,
      author: user?._id,
    });
    await newComment.save();
    return NextResponse.json({ message: "Comment added!", success: true });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "Failed to add comment",
      success: false,
    });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized", success: false });

    const { commentId, text } = await req.json();
    const comment = await CommentModel.findById(commentId);
    if (!comment)
      return NextResponse.json({
        message: "Comment not found",
        success: false,
      });

    if (comment?.author?.toString() !== user?._id?.toString()) {
      return NextResponse.json({ message: "Forbidden", success: false });
    }

    comment.text = text;
    await comment.save();
    return NextResponse.json({
      message: "Comment updated successfully!",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "Failed to update comment",
      success: false,
    });
  }
}

export async function DELETE(req) {
  await dbConnect();
  try {
    const { commentId } = await req.json();
    const comment = await CommentModel.findById(commentId);
    if (!comment)
      return NextResponse.json({
        message: "Comment not found",
        success: false,
      });
    await CommentModel.findByIdAndDelete(commentId);
    return NextResponse.json({
      message: "Comment deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "Failed to delete comment",
      success: false,
    });
  }
}
