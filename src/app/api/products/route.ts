import { NextRequest, NextResponse } from "next/server";
import { connectProducts } from "@/utils/mongoDB";
import { Product }from "@/utils/model/productModel";

connectProducts();

export async function GET(request :NextRequest){
    try {
        const products = await Product.find();
        return NextResponse.json({data: products, success: true},
            {status: 200,});

    } catch ( error: any) {
        return NextResponse.json({error: error.message, success:false},
            {status: 200});
        
    }
}