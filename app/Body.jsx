"use client";
import { useState, useEffect } from "react";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";
import { supabase } from "./(lib)/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useSessionStore } from "./(stores)";

export default function Body({ children }) {
  const [error, setError] = useState(null);
  const { setSession, setUser } = useSessionStore((state) => state);
  const pathname = usePathname();
  const display = !["/chat", "/groups"].includes(pathname);
  const router = useRouter();

  async function checkSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      setSession(data?.session);
      setUser(data?.session?.user);
    } else {
      router.push("/");
      if (error) setError(error);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <body className="">
      {display && <Header />}
      {error && <div>{error.message}</div>}
      {children}
      {display && <Footer />}
    </body>
  );
}
