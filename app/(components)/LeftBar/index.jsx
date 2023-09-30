"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { UserPlus2 } from "lucide-react";
import MessageCard from "../MessageCard";
import { supabase } from "@/app/(lib)/supabase";

export default function LeftBar() {
  const [messages, setMessages] = useState([
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
  ]);
  const [error, setError] = useState([]);

  async function checkSession() {
    const { data, error } = await supabase.auth.getSession();
    const user = data.session.user;
    console.log("user", user);
  }

  async function getMessages() {
    const { data, error } = await supabase.from("messages").select(`*`);
    console.log("data", data);
    if (data) setMessages(data);
    if (error) setError(error);
  }

  useEffect(() => {
    checkSession();
    getMessages();
  }, []);
  return (
    <div className={styles.leftbarContainer}>
      <header className={styles.header}>
        <h2>Messages</h2>
        <UserPlus2 className={styles.createGroupButton} />
      </header>
      {messages?.map((m) => (
        <MessageCard />
      ))}
    </div>
  );
}
