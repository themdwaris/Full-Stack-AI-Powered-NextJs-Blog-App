import dbConnect from "@/config/db/dbConnect";
import main from "@/config/gemini";
import { NextResponse } from "next/server";

export async function POST(req){
    await dbConnect()
  try {
    const {prompt}=await req.json()
    // console.log(prompt);
    
    const content = await main(prompt+' Generate blog a content for this topic in simple text format')

    return NextResponse.json({content:content,success:true})
  } catch (error) {
    return NextResponse.json({message:error.message||error,success:false})
  }
}