"use client";
import { useState } from "react";
import { Peer } from "peerjs";
import AddMessage from "../../chat/addMessage";

export default function MainBar({
  selectedRoom,
  selectedMember,
  displayRoomMessages,
  displayPrivateMessages,
}) {
  // const { name, nbUsers, image } = selectedRoom;
  const [privateMessages, setPrivateMessages] = useState(["hello"]);
  const [roomMessages, setRoomMessages] = useState(["world"]);
  // Create a peer
  const [peer, setPeer] = useState(new Peer());
  const [peerId, setPeerId] = useState("");
  console.log("peer", peer);

  // Connect to another peer
  const conn = peer.connect();

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

  return (
    <main className="flex flex-col items-center justify-center w-full h-full pt-5">
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
      {(displayRoomMessages || displayPrivateMessages) && <AddMessage />}
    </main>
  );
}
