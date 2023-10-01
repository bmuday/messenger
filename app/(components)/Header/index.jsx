"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { supabase } from "@/app/(lib)/supabase";
import { useSessionStore } from "@/app/(stores)";
import Image from "next/image";
import { headerLinks } from "../../(lib)/constants";
import Link from "next/link";

export default function Header() {
  const [error, setError] = useState(null);
  // const [isClient, setIsClient] = useState(false);
  const { session, user } = useSessionStore((state) => state);
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error);
  }
  useEffect(() => {}, []);
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src={"/images/logo.svg"}
          alt="logo"
          width={50}
          height={50}
          className={styles.logo}
        />
      </Link>
      <ul className={styles.links}>
        {headerLinks?.map((l) => (
          <li className={styles.link} key={l.url}>
            <Link href={l.url}>{l.label}</Link>
          </li>
        ))}
      </ul>
      {session ? (
        <div className={styles.sessionContainer}>
          <Link href="/chat">
            <button className={styles.chatLinkButton}>Go to Chat</button>
          </Link>
          <Image
            src={user.user_metadata.avatar}
            alt={""}
            width={50}
            height={50}
            className={styles.avatarImage}
          />
        </div>
      ) : (
        <div className={styles.noSessionContainer}>
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
      {error && <div>{error}</div>}
    </header>
  );
}
