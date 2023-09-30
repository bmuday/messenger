"use client";
import { useEffect } from "react";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";
import { supabase } from "./(lib)/supabase";

export default function Body({ children }) {
  async function checkSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data) console.log("session", data.session);
    if (error) console.log(error);
  }

  useEffect(() => {
    checkSession();
  }, []);
  return (
    <body className="">
      <Header />
      {children}
      <Footer />
    </body>
  );
}
