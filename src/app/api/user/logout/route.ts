import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
   try{
   const response = NextResponse.json({message: "user logged out successfully.",success:true},
    {status: 200});
    
    response.cookies.set("token","",{
      httpOnly: true, expires: new Date(0)
  });
    return response;
}catch(error: any){
    return NextResponse.json({message: error.message,success:false},
    {status: 500});
}

}