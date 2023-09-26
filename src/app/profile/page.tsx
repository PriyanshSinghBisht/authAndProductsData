"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const getUserData = async () => {
    try {
      let res: any = await fetch("/api/user/profile",{
        method: "GET"
      });
      res = await res.json();
      console.log(res);
      setUsername(res.user.username);
      setEmail(res.user.email);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/user/logout");
      toast.success(res.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleUpdate = async()=>{
      try {
          const res = await axios.post("api/user/profile"
          ,{username,email});
          toast.success(res.data.message);
          // handleLogout();
      } catch (error: any) {
           toast.error(error.message);
      }
  }
  return (
    <div className="w-fit m-auto flexCenter flex-col mt-20">
      <h1 className="text-center mb-4 text-[2rem]">Profile</h1>
      <h1> Username:</h1>
      <input
        type="text"
        className="max-w-[250px] px-2 py-1
           rounded-sm my-3 text-black border-gray-300 border-2"
        placeholder={username}
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <h1> Email: </h1>
      <input
        type="email"
        className="max-w-[250px] px-2 py-1
            rounded-sm my-3"
        placeholder={email}
        disabled={true}
      />
      <button
        className="w-fit px-3 py-1 rounded-lg text-white
            text-[20px] bg-blue-700 hover:bg-blue-500
            "
        onClick={handleUpdate}
      >
        save
      </button>

      <button
        className="w-fit px-3 py-1 rounded-lg text-white
            text-[20px] bg-red-700 hover:bg-red-500 my-4
            "
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}
