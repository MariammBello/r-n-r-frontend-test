// "use client";
// import { useAuth } from "@/contexts/auth-context";
// import { useRouter } from "next/navigation";
// import Link, { LinkProps } from "next/link";

// type ProtectedLinkProps = LinkProps & {
//   children: React.ReactNode;
// };

// export function ProtectedLink({ children, href, ...rest }: ProtectedLinkProps) {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (!isAuthenticated) {
//       e.preventDefault();
//       router.push("/login");
//     }
//   };

//   return (
//     <Link {...rest} href={href} onClick={handleClick}>
//       {children}
//     </Link>
//   );
// }

"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

type ProtectedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ProtectedLink({
  href,
  children,
  className,
}: ProtectedLinkProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push("/auth/login");
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
