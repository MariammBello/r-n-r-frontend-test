// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider, facebookProvider } from "./firebase";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/navigation"; // for Next.js App Router

//   // Google Sign-In
// export const signInWithGoogle = async (router: ReturnType<typeof useRouter>) => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     console.log("Google user:", result.user);
//     router.push("/"); // Redirect to homepage
//   } catch (error) {
//     console.error("Google Sign-in error:", error);
//   }
// };

// // Facebook Sign-In
// export const signInWithFacebook = async (router: ReturnType<typeof useRouter>) => {
//   try {
//     const result = await signInWithPopup(auth, facebookProvider);
//     console.log("Facebook user:", result.user);
//     router.push("/"); // Redirect to homepage
//   } catch (error) {
//     console.error("Facebook Sign-in error:", error);
//   }
// };


// export const logout = async () => {
//   try {
//     await signOut(auth);
//     console.log("User signed out");
//   } catch (error) {
//     console.error("Sign out error:", error);
//   }
// };


import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "./firebase";
import { useRouter } from "next/navigation"; // for Next.js App Router

let isSigningIn = false; // prevents multiple popup requests

// Google Sign-In
export const signInWithGoogle = async (router: ReturnType<typeof useRouter>) => {
  if (isSigningIn) return;
  isSigningIn = true;

  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google user:", result.user);
    router.push("/"); // Redirect to homepage
  } catch (error) {
    console.error("Google Sign-in error:", error);
  } finally {
    isSigningIn = false;
  }
};

// Facebook Sign-In
export const signInWithFacebook = async (router: ReturnType<typeof useRouter>) => {
  if (isSigningIn) return;
  isSigningIn = true;

  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("Facebook user:", result.user);
    router.push("/"); // Redirect to homepage
  } catch (error) {
    console.error("Facebook Sign-in error:", error);
  } finally {
    isSigningIn = false;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
