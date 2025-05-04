import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen font-sans flex-col sm:flex-row">
      {/* Left side - Shared Branding Panel */}
      <div className="w-full sm:w-1/2 relative hidden sm:block">
        <Image
          src="/images/flightimage.png" // Using /images/ path
          alt="Aerial view with world map"
          fill
          className="object-cover"
        />
        <Image
          src="/images/plane.png" // Using /images/ path
          alt="plane"
          width={800}
          height={100}
          className="absolute top-20 left-20 z-10"
        />
        <Image
          src="/images/logo2.png" // Using /images/ path
          alt="roots n routes logo"
          width={200}
          height={50}
          className="absolute bottom-10 right-14 z-10"
        />
      </div>

      {/* Right side - Page Specific Content */}
      {children}
    </div>
  );
}
