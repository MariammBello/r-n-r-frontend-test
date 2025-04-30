"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";

import React from "react"; // Import React for ReactNode type

// Define props for the HeroSlider component
interface HeroSliderProps {
  title?: string;
  description?: React.ReactNode;
  buttonText?: string;
  buttonLink?: string;
  className?: string; // Add className prop
}

// Default content
const defaultContent = {
  title: "Your gateway to authentic African Adventures",
  description: (
    <>
      Your all-in-one platform to{" "}
      <span className="font-medium">connect directly</span>,
      <span className="font-medium"> explore authentically</span> and
      <span className="font-medium"> travel</span> Africa{" "}
      <span className="font-medium">differently</span>
    </>
  ),
  authButtonText: "Explore Now",
  authButtonLink: "/experiences",
  noAuthButtonText: "Sign In",
  noAuthButtonLink: "/auth/login",
};

export default function HeroSlider({
  title = defaultContent.title,
  description = defaultContent.description,
  buttonText, // Explicit button text from props takes precedence
  buttonLink,
  className = "", // Destructure className with default
}: HeroSliderProps) {
  const { isAuthenticated } = useAuth();

  // Determine button content based on props or auth state
  const finalButtonText =
    buttonText ??
    (isAuthenticated
      ? defaultContent.authButtonText
      : defaultContent.noAuthButtonText);
  const finalButtonLink =
    buttonLink ??
    (isAuthenticated
      ? defaultContent.authButtonLink
      : defaultContent.noAuthButtonLink);

  // swiper navigate
  const swiperRef = useRef<any>(null);

  // const images = Array(5).fill("/images/hero-background.png");
  const images = [
    { image: "/images/hero-background.png" },
    {
      image:
        "https://images.pexels.com/photos/3011574/pexels-photo-3011574.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image:
        "https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image:
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image:
        "https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      image:
        "https://images.pexels.com/photos/1033729/pexels-photo-1033729.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    // Apply passed className along with default classes
    <section className={`w-full relative mb-10 ${className}`}>
      <div className="w-full max-w-[1300px] h-[680px] mx-auto relative overflow-hidden">
        {/* Background Image Slides */}
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          loop={true}
          className="absolute inset-0 z-0"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[680px]">
                <Image
                  src={src.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slide content - Use props or defaults */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-4xl mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mb-10">
            {description}
          </p>
          <Link
            href={finalButtonLink}
            className="px-10 py-4 bg-[#e09f3e] text-[#0e2f3c] text-lg font-bold rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            {finalButtonText}
          </Link>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-colors z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination dots - optional static style retained */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          <div className="w-8 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div> */}

        {/* Pagination dots - dynamic with Swiper */}
        <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10" />
      </div>
    </section>
  );
}
