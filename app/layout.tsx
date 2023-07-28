import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between w-full min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
