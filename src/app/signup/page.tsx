"use client"

import axios from "axios";
import { BiShow, BiHide } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup(){
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [disableButton, setDIsableButton] = useState(false);
    const [loading , setLoading] = useState(false);
    
    const router = useRouter();
    const handleSubmit = async()=>{
         try {

         setLoading(true);

          const res = await axios.post("/api/user/signup", user);
          console.log(res);
          toast.success("user created successfully");
          router.push("/login");
         } catch (error: any) {
           console.log("signup error: " + error);
           toast.error(error.message);
         }finally{
           setLoading(false);
         }
    };

    useEffect(()=>{
      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0 && !loading){
        setDIsableButton(false);
      }else{
        setDIsableButton(true);
      }
      console.log(user)
    },[user]);

    return (
        <div className="select-none flex flex-col dark:text form sm:m-auto m-5 sm:pt-10 pt-5">
             <h1 className="sm:text-5xl text-3xl mb-4 font-semibold">
             {loading?"Processgin...":"Signup"}</h1>
             <label htmlFor="username">Username</label>
             <input type="text" name="username" placeholder="Enter username" 
              value={user.username} required onChange={(e)=> setUser({...user,username:e.target.value})}
             />

             <label htmlFor="email">Email</label>
             <input type="email" name="email" placeholder="Enter email"
              value={user.email} required onChange={(e)=> setUser({...user,email:e.target.value})}
              />

             <label htmlFor="password">Password</label>
             <div className="relative w-full">
                 <input type={`${show?"text":"password"}`} name="password" placeholder="Enter password"
                  className="w-full sm:pr-10 pr-5"
                  value={user.password} required onChange={(e)=> setUser({...user,password:e.target.value})}
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
                      first-letter: text-white font-bold 
             ${disableButton?"bg-gray-400":"bg-green-500 hover:bg-green-700"}
               text-[20px] rounded-[4px]`} disabled={disableButton}
               onClick={handleSubmit}>
                 Signup </button>

<div className="flex items-end flex-col m-3">
                  <Link href="/login"
                    className="text-blue-500 hover:text-blue-700">
                       Login
                  </Link>
                  <Link href="/reset"
                    className="text-red-500 hover:text-red-700">
                      forgotPassword?
                  </Link>
              </div>
        </div>
    )
}