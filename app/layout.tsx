import "./globals.css";
import type { Metadata } from "next";
import Body from "../components/Body";

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
      <Body children={children} />
    </html>
  );
}
