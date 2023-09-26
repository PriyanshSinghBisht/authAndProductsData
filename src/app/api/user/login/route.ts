import { connect } from "@/utils/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/utils/model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
     try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        console.log(reqBody);

        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return NextResponse.json({error:"Invalid username"},
            {status: 400});
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        

        console.log(validPassword);

        if(!validPassword){
                return NextResponse.json({error:"Invalid password"},
                {status: 400});
            
        }
       
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        
        const token = jwt.sign(tokenData,
            process.env.TOKEN_SECRET!,{expiresIn: "1d"});
            
         const response = NextResponse.json({
            message: "Login Successfully",
            success: true,
     });

     response.cookies.set("token", token, {httpOnly: true});

     return response;

     } catch (error: any) {
         return NextResponse.json({error: error.message}, 
            {status:500});
     }
} 
