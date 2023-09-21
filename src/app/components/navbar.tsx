"use client"

import Link from "next/link"
import {usePathname} from "next/navigation";
import {HiSun , HiMoon} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {GiHamburgerMenu} from "react-icons/gi";
import { AiOutlineClose} from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Nav(){
    const [toggle, setToggle] = useState(true)
    const pathname = usePathname();
    const router = useRouter();
    const changeTheme = () =>{
        const theme = document.querySelector('html');
        theme?.classList.toggle('dark');
    };

    useEffect(()=>{
       const theme = localStorage.getItem("theme");
       console.log(theme)
    })
   
    const handleNav = (link : any)=>{
        router.push(link)
        setToggle((t)=>!t);
    }

    return(
        <div className="flex items-center sm:p-5 p-2 dark:bg-[rgba(250,250,250,0.05)] bg-[rgba(0,0,0,0.05)] ">
           <Toaster/>
           <div className="flex-1 sm:flex hidden ">
           {
             navlist.map((link : any)=>{
                return(
                    <Link href={link.href} key={link.name} 
                        className={`
                        ${pathname==link.href?"text-gray-400":"dark:text-white text-gray-800 hover:text-gray-400 dark:hover:text-gray-500"}
                            sm:text-[20px] text-[18px] font-semibold  sm:p-4 p-2 `}>
                         {link.name}
                    </Link>
                )
             })
           }
           </div>
            <div className="sm:ml-auto ml-5 sm:mr-5 mr-auto">
                <HiSun className="w-6 h-6 text-gray-400 cursor-pointer dark:block hidden" onClick={changeTheme} />
                <HiMoon className="w-6 h-6 text-gray-400 cursor-pointer dark:hidden  block" onClick={changeTheme} />
            </div>

            <div className={`sm:mr-5 mr-2 sm:hidden flex`}
            onClick={()=>setToggle((t)=>!t)}>
              { toggle?  
                <GiHamburgerMenu className="w-7 h-7 text-gray-400 cursor-pointer block" />:
                <AiOutlineClose className="w-7 h-7 text-gray-400 cursor-pointer block" />
              } 
            </div>
           
          <div className={`fixed top-0 right-0 w-full h-0 overflow-hidden
           dark:bg-white bg-black z-1 p-4  
         ${!toggle?"duration-1000 flex sm:hidden h-full":"hidden"} `}>

            <div className="flex flex-col mt-10 flex-1 items-center">
             {
                 navlist.map((link : any)=>{
                    return(
                        <div onClick={()=>handleNav(link.href)} key={link.name} 
                            className={`
                            ${pathname==link.href?"text-gray-400":"dark:text-black text-gray-800 hover:text-gray-400 dark:hover:text-gray-500"}
                                sm:text-[20px] text-[20px] font-semibold  sm:p-4 py-6 `}>
                             {link.name}
                        </div>
                    )
                 })
             }
             </div>
              
             <div className={`sm:mr-5 mr-2 sm:hidden flex`}
            onClick={()=>setToggle((t)=>!t)}>
              { toggle?  
                <GiHamburgerMenu className="w-7 h-7 text-gray-400 cursor-pointer block" />:
                <AiOutlineClose className="w-7 h-7 text-gray-400 cursor-pointer block" />
              } 
            </div>

          </div>
        </div>
    )
}

const navlist = [
    {
        name: "Home",
        href: "/"
    },,{
        name: "Products",
        href: "/products"
    },{
        name: "Profile",
        href: "/profile"
    },
    {
        name: "Login",
        href: "/login"
    }
];