"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Placeholder: check if user is signed in (replace with real auth logic)
    const isSignedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("signedIn") === "true";
    if (isSignedIn) {
      router.replace("/profile");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
