"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  getAuth,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/api/Firebase/firebase"; // your firebase config
import { useRouter } from "next/navigation";

// Your custom User type
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  verified: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Convert Firebase user to your app's user type
  const formatUser = (fbUser: FirebaseUser): User => ({
    id: fbUser.uid,
    name: fbUser.displayName ?? "No Name",
    email: fbUser.email ?? "",
    avatar: fbUser.photoURL ?? "/placeholder.svg",
    role: "User",
    verified: fbUser.emailVerified,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(formatUser(fbUser));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const login = (userData: User) => setUser(userData);

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      router.push("/login");
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// "use client"

// import { createContext, useContext, useState, type ReactNode } from "react"

// // Define user type
// export type User = {
//   id: string
//   name: string
//   email: string
//   avatar: string
//   role: string
//   verified: boolean
// }

// // Define auth context type
// type AuthContextType = {
//   user: User | null
//   isAuthenticated: boolean
//   login: (user: User) => void
//   logout: () => void
// }

// // Create context with default values
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   isAuthenticated: false,
//   login: () => {},
//   logout: () => {},
// })

// // Sample user data
// const sampleUser: User = {
//   id: "1",
//   name: "Sarah Phillips",
//   email: "sarah.phillips@example.com",
//   avatar: "/placeholder.svg?height=40&width=40",
//   role: "Certified Wanderer",
//   verified: true,
// }

// // Auth provider component
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)

//   const login = (userData: User) => {
//     setUser(userData)
//   }

//   const logout = () => {
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // Custom hook to use auth context
// export function useAuth() {
//   return useContext(AuthContext)
// }

// // Hook to get sample user (for demo purposes)
// export function useSampleUser() {
//   return sampleUser
// }
