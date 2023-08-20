"use client";
import { useEffect, useState } from "react";
import AddMessage from "../../chat/addMessage";

export default function MainBar({
  member,
  peer,
  selectedRoom,
  selectedMember,
  displayRoomMessages,
  displayPrivateMessages,
}) {
  // const { name, nbUsers, image } = selectedRoom;
  const [privateMessages, setPrivateMessages] = useState(["hello"]);
  const [roomMessages, setRoomMessages] = useState(["world"]);

  // Connect to another peer
  if (selectedMember) {
    const conn = peer.connect(selectedMember.peerId);

    peer.on("connection", (conn) => {
      console.log("conn", conn);
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send({ [selectedMember?.firstName]: "hello!" });
      });
    });
  }

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
