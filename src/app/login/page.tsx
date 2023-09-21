"use client"

import { BiShow, BiHide } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login(){
 
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const router = useRouter();

    const handleLogin = async()=>{
        try {
            setLoading(true);
            setDisabledButton(true);
            const res = await  axios.post("/api/user/login", user);
            console.log("login successfullly")
            toast.success("login successfully");
            router.push('/profile');
        } catch (error : any) {
            toast.error(error);
            console.log(error);
        }finally{
            setLoading(false);
            setDisabledButton(false);
        }
    }

    useEffect((()=>{
        if(user.email && user.password){
            setDisabledButton(false);
        }else{
            setDisabledButton(true);
        }
    }),[user])
    return (
        <div className="select-none flex flex-col dark:text form sm:m-auto m-5 sm:pt-10 pt-5">
             <h1 className="sm:text-5xl text-3xl mb-4 font-semibold">
                {loading?"Processing...":"Login"}</h1>
        
             <label htmlFor="email">Email</label>
             <input type="email" name="email" placeholder="Enter email"
             value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}
             />

             <label htmlFor="password">Password</label>
             <div className="relative w-full">
                 <input type={`${show?"text":"password"}`} name="password" placeholder="Enter password"
                  className="w-full sm:pr-10 pr-5" 
                  value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}
                  />
                 <div 
                    className="absolute  top-1/2 text-[30px] 
                    translate-y-[-50%] sm:right-5 right-2 text-gray-600"
                    onClick={()=>setShow((show)=>!show)}>
                    { show?
                      <BiHide />:
                      <BiShow />
                      }
                 </div>
             </div>
             <button className={`w-full sm:mt-10 mt-5 sm:p-2 p-1 
              text-white font-bold 
              text-[20px] rounded-[4px]
              ${disabledButton?"bg-gray-500":"bg-blue-500 hover:bg-blue-700"}`}
              disabled={disabledButton}
              onClick={handleLogin}
              >Login</button>
              <div className="flex items-end flex-col m-3">
                  <Link href="/signup"
                    className="text-blue-500 hover:text-blue-700">
                       Signup
                  </Link>
                  <Link href="/reset"
                    className="text-red-500 hover:text-red-700">
                      forgotPassword?
                  </Link>
              </div>
        </div>
    )
}