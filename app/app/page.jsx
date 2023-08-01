"use client";
import { useEffect, useState } from "react";
import { members, rooms } from "@/dummydata";
import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import AddMessage from "../../components/chat/addMessage";
import SearchBar from "../../components/SearchBar";

export default function Chat() {
  // Dès la 1e connecxion,
  // faire settingsCheck et enregistrer paramètres dans le profil user
  const [publicRooms, setPublicRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [displayRoomMessages, setDisplayRoomMessages] = useState(true);
  const [displayPrivateMessages, setDisplayPrivateMessages] = useState(false);
  const [displayMembers, setDisplayMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [displaySelectedMember, setDisplaySelectedMember] = useState(false);

  useEffect(() => {
    // fetch public rooms /rooms (server-side call with api key)
    const getPublicRooms = async () => {
      // const res = await fetch("/api/rooms")
      // const data = await res.json()
      // setPublicRooms(data)
      setPublicRooms(rooms);
    };
    getPublicRooms();
  }, []);

  useEffect(() => {
    // fetch room members, no ghost with api endpoint /presence (server-side call with api key)
    const getRoomMembers = async () => {
      // const res = await fetch("/api/presence")
      // const data = await res.json()
      // setRoomMembers(data);
      const roomMembers = members.filter((m) => m.roomId === selectedRoom.id);
      setRoomMembers(roomMembers);
    };

    getRoomMembers();
    // display room members
    setDisplaySelectedMember(false);
    setDisplayMembers(true);
  }, [selectedRoom]);
  return (
    <div className="flex items-center h-full">
      <LeftBar />
      <div className="flex flex-col items-center justify-center w-full h-full border">
        <div className="flex justify-between w-full h-full">
          <div className="flex flex-col w-full">
            <SearchBar />
            <MainBar selectedRoom={selectedRoom} />
            {(displayRoomMessages || displayPrivateMessages) && <AddMessage />}
          </div>
          {displayMembers && (
            <RightBar
              publicRooms={publicRooms}
              setSelectedRoom={setSelectedRoom}
              roomMembers={roomMembers}
              setDisplayMembers={setDisplayMembers}
              displaySelectedMember={displaySelectedMember}
              setDisplaySelectedMember={setDisplaySelectedMember}
              setSelectedMember={setSelectedMember}
            />
          )}
          {displaySelectedMember && (
            <SelectedMember
              selectedMember={selectedMember}
              setDisplayMembers={setDisplayMembers}
              setDisplaySelectedMember={setDisplaySelectedMember}
            />
          )}
        </div>
      </div>
    </div>
  );
}