"use client";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import classnames from "classnames";

export default function Body({ children }) {
  const pathname = usePathname();
  const display = !pathname.includes("/app");
  const container = classnames({
    "flex flex-col justify-between h-full": true,
    container: display,
  });
  return (
    <body className={container}>
      <Header display={display} />
      <main className="flex items-center justify-center h-full">
        {children}
      </main>
      <Footer display={display} />
    </body>
  );
}
