"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { notificationTime } from "@/lib/constants";

export default function Body({ children }) {
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const chatRoutes = ["/messages", "/rooms", "/search"];
  const display = !chatRoutes.includes(pathname);
  const publicRoutes = [
    "/",
    "/search/rooms",
    "/search/members",
    "/blog",
    "/terms",
    "/legal",
    "/contact",
    "/login",
    "/register",
  ];
  const privateRoutes = !publicRoutes.includes(pathname);
  const router = useRouter();

  async function checkSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setError(error);
      console.log("error", error);
      setTimeout(() => {
        setError(null);
        router.push("/login");
      }, notificationTime);
    } else {
      if (!data.session && privateRoutes) {
        setError({ message: "Session expired, please login." });
        setTimeout(() => {
          setError(null);
          router.push("/login");
        }, notificationTime);
      }
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <body className="flex flex-col justify-between w-full h-full bg-gray-100">
      {display && <Header />}
      {error && <div>{error.message}</div>}
      <main className="flex items-center justify-center w-full h-full">
        {children}
      </main>
      {display && <Footer />}
    </body>
  );
}
