"use client";
import { useState, useRef } from "react";
import { useConversationStore, useSessionStore } from "@/app/(stores)";
import styles from "./styles.module.css";
import { supabase } from "@/app/(lib)/supabase";

export default function AddMessage() {
  const [error, setError] = useState(null);
  const { user } = useSessionStore((state) => state);
  const inputRef = useRef();
  const { conversation } = useConversationStore((state) => state);

  async function sendMessage(e) {
    e.preventDefault();

    if (!inputRef.current.value) return;
    const author = user.id;
    const date = new Date();
    const sentAt = `${date.getHours()}:${date.getMinutes()}`;

    const { error } = await supabase.from("messages").insert({
      conversationId: conversation.id,
      content: inputRef.current.value,
      author,
      sentAt,
    });
    if (error) setError(error);

    // Clean input field
    inputRef.current.value = "";
  }
  return (
    <form className="form" onSubmit={sendMessage}>
      {error && <div>{error.message}</div>}
      <input
        className={styles.input}
        ref={inputRef}
        type="text"
        placeholder="Send message..."
      />
      <button className={styles.button} type="submit">
        Send
      </button>
    </form>
  );
}
