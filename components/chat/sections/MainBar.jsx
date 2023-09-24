"use client";
import { useState } from "react";
import AddMessage from "../../chat/addMessage";

export default function MainBar({
  selectedRoom,
  displayRoomMessages,
  displayPrivateMessages,
}) {
  // const { name, nbUsers, image } = selectedRoom;
  const [privateMessages, setPrivateMessages] = useState(["hello"]);
  const [roomMessages, setRoomMessages] = useState(["world"]);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full pt-5">
      <div className="mb-5">{selectedRoom?.name}</div>
      {displayRoomMessages &&
        roomMessages?.map((m, index) => (
          <div key={index} className="h-full">
            {m}
          </div>
        ))}
      {displayPrivateMessages &&
        privateMessages?.map((m, index) => (
          <div key={index} className="h-full">
            {m}
          </div>
        ))}
      {(displayRoomMessages || displayPrivateMessages) && (
        <AddMessage
          setRoomMessages={setRoomMessages}
          setPrivateMessages={setPrivateMessages}
        />
      )}
    </main>
  );
}
