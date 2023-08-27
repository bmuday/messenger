"use client";
import { usePathname } from "next/navigation";
import { useDarkStore } from "@/stores";
import { leftBarLinks } from "@/lib/constants";
import Header from "./header";
import Footer from "./footer";
import classnames from "classnames";

export default function Body({ children }) {
  const pathname = usePathname();
  const leftBar = leftBarLinks.map((l) => l.url);
  const links = [...leftBar, "/settings", "/app"];
  const display = !links.includes(pathname);
  const dark = useDarkStore((state) => state.dark);
  const dynamic_class = classnames({
    "flex flex-col justify-between h-full w-full": true,
    container: display,
    dark,
  });

  return (
    <body className={dynamic_class}>
      {display && <Header />}
      <main className="flex items-center justify-center w-full h-full">
        {children}
      </main>
      {display && <Footer />}
    </body>
  );
}
