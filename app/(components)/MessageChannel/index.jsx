"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { supabase } from "@/app/(lib)/supabase";
import MessageCard from "../MessageCard";
import AddMessage from "../AddMessage";
import { useConversationStore } from "@/app/(stores)";

export default function MessageChannel() {
  const [error, setError] = useState(null);
  const { conversation } = useConversationStore((state) => state);
  const conversationId = conversation.id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Retrieve my user messages in realtime(notifications)
  async function getMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .match({ conversationId });

    if (data) setMessages(data);
    if (error) setError(error);
  }

  // Listen to new messages from selected conversation
  const channelId = conversation.id.toString();
  supabase
    .channel(channelId)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        setNewMessage(payload.new);
      }
    )
    .subscribe();

  useEffect(() => {
    // Fetch all messages
    getMessages();
  }, [conversation]);

  useEffect(() => {
    setMessages([...messages, newMessage]);
  }, [newMessage]);

  return (
    <div className={styles.container}>
      {error && <div>{error.message}</div>}
      <div className={styles.cardsContainer}>
        {messages?.map((m, index) => (
          <MessageCard key={index} message={m} />
        ))}
      </div>
      <AddMessage />
    </div>
  );
}
