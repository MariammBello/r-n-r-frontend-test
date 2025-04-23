"use client";

import Image from "next/image";
import { useState } from "react";

export default function Password() {
  const [code, setCode] = useState("");

  return (
        <div className="flex h-screen font-sans flex-col sm:flex-row">
             <div className="w-full sm:w-1/2 relative hidden sm:block">
               <Image
                      src="/images/flightimage.png"
                      alt="plane image"
                 fill
                 className="object-cover"
               />
       
               <Image
                 src="/Images/plane.png"
                 alt="plane"
                 width={800}
                 height={100}
                 className="absolute top-20 left-20 z-10"
               />
       
               <Image
                 src="/Images/logo.png"
                 alt="roots n routes logo"
                 width={200}
                 height={50}
                 className="absolute bottom-10 right-14 z-10"
               />
             </div>
       
          
             <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-6 sm:p-14">
               <Image
                 src="/Images/logo.svg"
                 alt=" roots n routes logo"
                 width={100}
                 height={50}
                 className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
               />
        <h1 className="text-2xl font-bold text-amber-500 mb-4 font-bricolage">
          Input your password
        </h1>

        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your password"
          className="border rounded-lg p-2 w-64 sm: mt-11"
        />
        <a href="" className="underline text-bold mt-4">Forgot Password?</a>

        <button className="w-64 bg-slate-800 text-white py-2 rounded-lg mb-3 mt-9sm: mt-11 hover:bg-amber-500 hover:text-slate-800">
          Sign in
        </button>
      </div>
    </div>
    
  );
}
