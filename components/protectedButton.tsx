"use client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ProtectedButton({ onClick, ...props }: Props) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push("/auth/login");
      return;
    }
    onClick?.(e);
  };

  return <button {...props} onClick={handleClick} />;
}
