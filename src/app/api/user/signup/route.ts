import { NextResponse, NextRequest } from "next/server";
import { User} from '@/utils/model/userModel'
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        const {username, email, password} = reqBody;
       
       const user  = await User.findOne({ email});
       
       console.log(user)

       if(user){
           return new Response(JSON.stringify({message: "User already exists"}), {status: 400});
       }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    });

    const saveduser = await newUser.save();
    console.log(saveduser);

    return NextResponse.json({message: "user created successfully", success: true}, 
    {status: 200});

    } catch (error : any) {
         return NextResponse.json({ error: error.message, success: false},
            {status: 500})
    }
}