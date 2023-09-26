import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/utils/model/userModel";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest){
      try {
        const token =  request.cookies.get("token")?.value || '';
        const {email} : any = jwt.verify( token , process.env.TOKEN_SECRET!);
       
        const data = await User.findOne({ email: email});
        console.log(data);
       
        const user = {
                    username : data.username,
                    email: data.email
      };
        console.log(user)
        return NextResponse.json( {user: user,success:true},
            {status:200});
        
      } catch ( error: any) {
          return NextResponse.json({error: error.message, success:false},
            {status:500});
      }     
}

export async function POST(request :NextRequest){
      try {
           const reqBody = await request.json();
           const {username , email} = reqBody;
        
          const user = await User.findOneAndUpdate({email} , {username}, {new:true})
          console.log(user);
          await user.save();
          revalidatePath("profile");
          return NextResponse.json({message:'user updated successfully', success: true},
          {status:200});
      } catch (error: any) {
           return NextResponse.json({error: error.message},
              {status: 500})
      }
  }
