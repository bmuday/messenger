import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col">
      <div></div>
      <div></div>
      <Link href="/chat" className="">
        Go to chat
      </Link>
    </section>
  );
}
