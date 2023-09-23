"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Products(){
   const [products, setProducts] = useState([{}]);

   const getData = async ()=>{
       const res = await axios.get("/api/products");
       console.log(res);
       const data = res.data.data;
       setProducts(data)
   }
useEffect(()=>{
   getData();
},[]);

    return(
       <div className="flexCenter flex-col items-center mt-10">
           <h1 className="sm:text-[50px] text-[25px] ">Product List</h1>
         { 
            products.map((product: any , index : any)=>{
               return(
                  <div key={index} className="my-3">
                     <h1 className="dark:text-gray-400  text-gray-600 
                     font-semibold">Product No.{index}</h1>
                     <div className="flexCenter flex-col ml-4">
                        <pre> Name  :  {product.name}</pre>
                        <pre> Color :  {product.color}</pre>
                        <pre> Price :  {product.price}</pre>
                     </div>
                  </div>
               )
            })
          }
          <p>you can edit this list
             from <Link href="https://priyansh-productlist-mongodb.netlify.app/productlist" target="_blank"
            className="underline text-blue-700 hover:text-blue-500">here</Link>
          </p>
       </div>
    )
  }