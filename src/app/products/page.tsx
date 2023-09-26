"use client"

import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";

export default function Products(){
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const getData = async ()=>{
       let res : any = await fetch("/api/products",{
         method: "GET"
       });
       res = await res.json();
       console.log(res);
       const data = res.data;
       setProducts(data)
       setLoading(false);
   }
useEffect(()=>{
   getData();
},[]);
    if(loading) 
        return <div className="m-auto"><div className="loading m-auto"> </div></div>
   else
    return(
      <Suspense fallback={<h1>loading</h1>}>
       <div className="flexCenter flex-col items-center mt-10">
           <h1 className="sm:text-[50px] text-[25px] ">Product List</h1>
         { 
          products &&

            products?.map((product: any , index : any)=>{
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
       </Suspense>
    )
  }

  export const  revalidate = 0;