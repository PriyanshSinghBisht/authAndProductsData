import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest){
      try {
        const token = await request.cookies.get("token")?.value || '';
        const data : any = jwt.verify( token , process.env.TOKEN_SECRET!);
        console.log(data)

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