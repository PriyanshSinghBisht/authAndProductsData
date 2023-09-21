import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/mongoDB";
import { User } from "@/utils/model/userModel";
import { revalidatePath } from "next/cache";

connect();

export async function POST(request :NextRequest){
    try {
         const reqBody = await request.json();
         const {username , email} = reqBody;
      
        const user = await User.findOneAndUpdate({email}, {username} ,{new:true})
        console.log(user);
        await user.save();
        
        return NextResponse.json({message:'user updated successfully', success: true},
        {status:200});
    } catch (error: any) {
         return NextResponse.json({error: error.message},
            {status: 500})
    }
}