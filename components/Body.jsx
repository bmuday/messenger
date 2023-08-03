"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import classnames from "classnames";
import { useDarkStore } from "@/stores";

export default function Body({ children }) {
  const pathname = usePathname();
  const display = !pathname.includes("/app");
  const dark = useDarkStore((state) => state.dark);
  const dynamic_class = classnames({
    "flex flex-col justify-between h-full w-full": true,
    container: display,
    dark,
  });
  return (
    <body className={dynamic_class}>
      <Header display={display} />
      <main className="flex items-center justify-center w-full h-full">
        {children}
      </main>
      <Footer display={display} />
    </body>
  );
}
