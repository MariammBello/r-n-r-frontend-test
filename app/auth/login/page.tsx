"use client";

import Image from "next/image";
import { useState } from "react";

export default function EmailVerification() {
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
             src="/Images/logo2.png"
             alt="Logo"
             width={200}
             height={50}
             className="absolute bottom-10 right-14 z-10"
           />
         </div>
   
      
         <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-white p-6 sm:p-14">
           <Image
             src="/Images/logo.svg"
             alt="Logo"
             width={100}
             height={50}
             className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
           />
        <h1 className="text-2xl font-bold text-amber-500 mb-7 font-bricolage">
          Let's confirm your mail
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          Input the verification code sent to your mail
        </p>

        <input
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="mb-4 border rounded-lg p-2 w-64"
        />

        <button className="w-64 bg-slate-800 text-white py-2 rounded-lg mb-12 hover:bg-amber-500 hover:text-slate-800 ">
          Continue
        </button>
        <button className="w-64 mt-3 bg-amber-500 text-white py-2 rounded-lg hover:bg-slate-800">
          Sign In with Password
        </button>
      </div>
    </div>
  );
}
