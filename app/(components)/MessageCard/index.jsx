"use client";
import styles from "./styles.module.css";
import { useSessionStore } from "@/app/(stores)";

export default function MessageCard({ message }) {
  // Retrieve user
  const { user } = useSessionStore((state) => state);
  // Retrieve message
  const { content, author, sentAt } = message;

  if (author === user?.id) {
  } else {
  }

  return (
    <div className={styles.card}>
      {content} {sentAt}
    </div>
  );
}
