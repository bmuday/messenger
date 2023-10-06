"use client";
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
    <div className="w-full h-full p-4">
      {selectedConversation ? (
        <MessageChannel />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="font-bold">Select a chat or start a new conversation</p>
        </div>
      )}
    </div>
  );
}
