"use client";
import { supabase } from "@/supabase";
import { useEffect } from "react";
import { useUserStore, useDarkStore } from "@/stores";
import Header from "./header";
import Footer from "./footer";
import classnames from "classnames";
import { useRouter, usePathname } from "next/navigation";
import { headerLinks } from "@/lib/constants";

export default function Body({ children }) {
  const dark = useDarkStore((state) => state.dark);
  const dynamic_class = classnames({
    "container flex flex-col justify-between h-full w-full": true,
    dark,
  });
  const { user, session } = useUserStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  const links = headerLinks.map((l) => l.url);
  console.log("links", links);
  const display = ["/", ...links].includes(pathname);
  console.log("display", display);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login");
      }
    });
  }, []);

  console.log("session", session);
  console.log("user", user);

  return (
    <body className={dynamic_class}>
      <div className="fixed z-99 "></div>
      {display && <Header />}
      <main className="flex items-center justify-center w-full h-full">
        {children}
      </main>
      {display && <Footer />}
    </body>
  );
}
