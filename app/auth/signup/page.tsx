"use client";

import Image from "next/image";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

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

        <h1 className="font-bricolage text-2xl font-bold text-amber-500 mb-4">
          Complete Sign Up
        </h1>

        <div className="flex flex-col items-start w-full max-w-xs">
          <label htmlFor="firstname" className="font-medium mb-1">
            Firstname
          </label>
          <input
            id="firstname"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded p-2 w-full mb-5"
          />

          <label htmlFor="lastname" className="font-medium mb-3">
            Lastname
          </label>
          <input
            id="lastname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded p-2 w-full mb-5"
          />

          <label htmlFor="gender" className="font-medium mb-3">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded p-2 w-full mb-5 bg-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="password" className="font-medium mb-3">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-7"
          />
        </div>

        <button className="w-full max-w-xs bg-slate-800 text-white py-2 rounded-md hover:bg-amber-500 hover:text-slate-800">
          Continue
        </button>
      </div>
    </div>
  );
}
