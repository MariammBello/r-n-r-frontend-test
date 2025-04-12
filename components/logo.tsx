import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "default" | "white"
}

const Logo: React.FC<LogoProps> = ({ className, variant = "default" }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Path is already correct as /images/logo.svg since we moved files */}
      {variant === "white" ? (
        <div className="[&_path]:fill-white [&_text]:fill-white">
          <Image src="/images/logo.svg" alt="Roots n Routes" width={200} height={80} className="w-full h-auto" />
        </div>
      ) : (
        <Image src="/images/logo.svg" alt="Roots n Routes" width={200} height={80} className="w-full h-auto" />
      )}
    </div>
  )
}

export default Logo
