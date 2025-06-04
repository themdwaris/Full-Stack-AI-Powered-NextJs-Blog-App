import { getUserFromToken } from "@/helpers/getUserFromToken";
import { NextResponse } from "next/server";

export async function GET(req){
    
    try {
        const user = await getUserFromToken(req)
        if(!user){
            return NextResponse.json({message:"User not found",success:false})
        }
        return NextResponse.json({user,success:true})
    } catch (error) {
        console.log("Failed to get user:",error);
        return NextResponse.json({message:error?.message||error,success:false})
    }
}