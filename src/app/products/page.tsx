import axios from "axios";

export default async function Products(){
   const res = await axios.get(`${process.env.DOMAIN}/api/products`);
    const products = res.data.data;
    console.log(res);
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
             from <a href="https://priyansh-productlist-mongodb.netlify.app/productlist" target="_blank"
            className="underline text-blue-700 hover:text-blue-500">here</a>
          </p>
       </div>
    )
  }