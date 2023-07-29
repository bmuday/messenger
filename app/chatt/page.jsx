"use client";
import { useEffect, useState } from "react";
import { members, rooms } from "@/dummydata";
import RoomsBar from "../../components/chat/sections/RoomsBar";
import MainBar from "../../components/chat/sections/MainBar";
import MembersBar from "../../components/chat/sections/MembersBar";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import AddMessage from "../../components/chat/addMessage";

export default function Chat() {
  // Dès la 1e connecxion,
  // faire settingsCheck et enregistrer paramètres dans le profil user
  const [publicRooms, setPublicRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [displayRoomMessages, setDisplayRoomMessages] = useState(false);
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
    <div>
      <div className="flex items-center justify-between space-y-4">
        <RoomsBar publicRooms={publicRooms} setSelectedRoom={setSelectedRoom} />
        <MainBar selectedRoom={selectedRoom} />
        {displayMembers && (
          <MembersBar
            roomMembers={roomMembers}
            setDisplayMembers={setDisplayMembers}
            setDisplaySelectedMember={setDisplaySelectedMember}
            setSelectedMember={setSelectedMember}
          />
        )}
        {displaySelectedMember && (
          <SelectedMember selectedMember={selectedMember} />
        )}
      </div>
      <footer>
        <AddMessage />
      </footer>
    </div>
  );
}
