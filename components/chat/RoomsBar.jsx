"use client";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { UserPlus2 } from "lucide-react";
import ConversationCard from "../ConversationCard";
import { useSessionStore } from "../../(stores)";
import { supabase } from "@/app/(lib)/supabase";

export default function RoomsBar() {
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [newRoom, setNewRoom] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [newConversation, setNewConversation] = useState(null);
  const { session } = useSessionStore((state) => state);
  const user = session?.user;
  const userId = user?.id;

  console.log("userId", userId);

  // Retrieve my user conversations in realtime(notifications)
  async function getConversations() {
    const { data, error } = await supabase
      .from("conversations")
      .select()
      .or(`host.eq.${userId},guest.eq.${userId}`);
    console.log("data", data);
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
    <div
      className="width: 300px;
    border-right: 1px solid lightgray;
    overflow-y: scroll;"
    >
      {error && <div>{error.message}</div>}
      <div className={styles.roomsContainer}>
        <header className="flex items-center justify-between my-4">
          <h2>Rooms</h2>
          <UserPlus2
            className="padding: 5px;
  border-radius: 50%;
  background-color: lightgray;
  cursor: pointer;"
          />
        </header>
        {rooms | (rooms?.length > 1) ? (
          rooms.map((room, index) => <RoomCard key={index} room={room} />)
        ) : (
          <p>No rooms</p>
        )}
      </div>
    </div>
  );
}
