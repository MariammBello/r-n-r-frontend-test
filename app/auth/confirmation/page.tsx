"use client";

import Image from "next/image";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex h-screen font-sans flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 relative hidden sm:block">
        <Image
          src="/Images/flightimage.png"
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
          alt="roots n routes logo"
          width={200}
          height={50}
          className="absolute bottom-10 right-14 z-10"
        />
      </div>

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-6 sm:p-14">
        <Image
          src="/Images/logo.svg"
          alt="roots n routes logo"
          width={100}
          height={50}
          className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
        />
     
        <h1 className="text-2xl font-bold text-amber-500 mb-4 font-bricolage">
          Lets confirm it's you
        </h1>
        {/* {email} */}
        <p>Enter the 6-digit verification code sent to: </p>
        <div className="flex flex-col mb-4 w-64 sm: ">
          <label htmlFor="email" className="font-medium mb-2">
          john@xyz.com          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@xyz.com"
            className="border rounded-lg p-2"
          />
        </div>
        <button className="w-64 bg-slate-800 text-white py-2 rounded-lg mt-8 hover:bg-amber-500 hover:text-slate-800">
          Continue
        </button>
        <a href="/" className="mt-11 underline font-bold">Resend Code</a>
        <p className="mt-4">Still cant log in? <a href="/" className="underline font-semibold">Contact our help center</a></p>
        

      </div>
    </div>
  );
}
