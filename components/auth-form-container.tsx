import Image from "next/image";
import React from "react";

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ title, children }) => {
  return (
    <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-6 sm:p-14">
      {/* Logo */}
      <Image
        src="/images/logo.svg" // Corrected path casing
        alt="roots n routes logo"
        width={100}
        height={50}
        className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
      />
      {/* Form Content Wrapper */}
      <div className="w-full max-w-md">
        {/* Heading */}
        <h1 className="text-[#e09f3e] text-3xl font-medium mb-8 text-center">
          {title}
        </h1>
        {/* Page-specific form elements */}
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
