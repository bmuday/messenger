"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { UserPlus2 } from "lucide-react";
import ConversationCard from "../ConversationCard";
import { useSessionStore } from "../../(stores)";
import { supabase } from "@/app/(lib)/supabase";

export default function LeftBar() {
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [newRoom, setNewRoom] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [newConversation, setNewConversation] = useState(null);
  const { user } = useSessionStore((state) => state);
  const userId = user?.id;

  console.log("userId", userId);

  // Retrieve my user conversations in realtime(notifications)
  async function getConversations() {
    const { data, error } = await supabase
      .from("conversations")
      .select()
      .or(`host.eq.${userId},guest.eq.${userId}`);
    if (data) setConversations(data);
    if (error) setError(error);
  }

  // Listen to new messages from selected conversation
  // const channelId = userId.toString();
  // supabase
  //   .channel(channelId)
  //   .on(
  //     "postgres_changes",
  //     { event: "INSERT", schema: "public", table: "conversations" },
  //     (payload) => {
  //       setNewConversation(payload.new);
  //     }
  //   )
  //   .subscribe();

  useEffect(() => {
    if (userId) getConversations();
  }, [userId]);

  useEffect(() => {
    if (conversations) setConversations([...conversations, newConversation]);
  }, [newConversation]);

  console.log("conversations", conversations);
  return (
    <div className={styles.leftbarContainer}>
      {error && <div>{error.message}</div>}
      <div className={styles.roomsContainer}>
        <header className={styles.header}>
          <h2>Rooms</h2>
          <UserPlus2 className={styles.createGroupButton} />
        </header>
        {rooms | (rooms?.length > 1) ? (
          rooms.map((room, index) => <RoomCard key={index} room={room} />)
        ) : (
          <p>No rooms</p>
        )}
      </div>
      <div className={styles.conversationsContainer}>
        <header className={styles.header}>
          <h2>Messages</h2>
        </header>
        {conversations | (conversations?.length > 1) ? (
          conversations.map((conversation, index) => (
            <ConversationCard key={index} conversation={conversation} />
          ))
        ) : (
          <p>No conversations</p>
        )}
      </div>
    </div>
  );
}
