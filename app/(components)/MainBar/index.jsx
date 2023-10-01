"use client";
import styles from "./styles.module.css";
import MessageChannel from "../MessageChannel";
import { useConversationStore } from "@/app/(stores)";
import { useEffect, useState } from "react";

export default function MainBar() {
  const { conversation } = useConversationStore((state) => state);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    setSelectedConversation(conversation);
  }, [conversation]);
  return (
    <div className={styles.mainbarContainer}>
      {selectedConversation ? (
        <MessageChannel />
      ) : (
        <div className={styles.noMessageContainer}>
          <p className={styles.noMessage}>
            Select a chat or start a new conversation
          </p>
        </div>
      )}
    </div>
  );
}
