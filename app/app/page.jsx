"use client";
import { useEffect, useState } from "react";
import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import SearchBar from "../../components/SearchBar";

export default function Chat() {
  // Dès la 1e connexion,
  // faire settingsCheck et enregistrer paramètres dans le profil user
  const [error, setError] = useState(null);
  const [publicRooms, setPublicRooms] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomMembers, setRoomMembers] = useState([]);
  const [displayRoomMessages, setDisplayRoomMessages] = useState(true);
  const [displayPrivateMessages, setDisplayPrivateMessages] = useState(false);
  const [displayMembers, setDisplayMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [displaySelectedMember, setDisplaySelectedMember] = useState(false);

  // fetch public rooms /rooms (server-side call with api key)
  const getPublicRooms = async () => {
    const endpoint = "/items/rooms";
    const URL = process.env.NEXT_PUBLIC_API_URL + endpoint;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
    };

    if (access_token) options.headers.Authorization = `Bearer ${access_token}`;
    try {
      const { data } = await useFetch(URL, options);
      console.log("data", data);
      setPublicRooms(data);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  // fetch activeMembers
  const getActiveMembers = async () => {
    const endpoint = "/items/members";
    const URL = process.env.NEXT_PUBLIC_API_URL + endpoint;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
    };

    if (access_token) options.headers.Authorization = `Bearer ${access_token}`;
    try {
      const { data } = await useFetch(URL, options);
      console.log("data1", data);
      setActiveMembers(data);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    getPublicRooms();
    getActiveMembers();
    setSelectedRoom(publicRooms[0]);
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
    // display room members and messages
    setDisplaySelectedMember(false);
    setDisplayMembers(true);
    setDisplayRoomMessages(true);
  }, [selectedRoom]);

  console.log("publicRooms: ", publicRooms);
  console.log("activeMembers: ", activeMembers);
  console.log("selectedRoom", selectedRoom);
  console.log("roomMembers", roomMembers);

  return (
    <div className="flex w-full h-full">
      <LeftBar />
      <div className="flex flex-col w-full h-full">
        <SearchBar />
        {selectedRoom && (
          <MainBar
            selectedRoom={selectedRoom}
            selectedMember={selectedMember}
            displayRoomMessages={displayRoomMessages}
            displayPrivateMessages={displayPrivateMessages}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-3 space-y-2 border bg-gray-50">
        <div className="flex justify-between w-full h-full">
          {displayMembers && (
            <RightBar
              publicRooms={publicRooms}
              setSelectedRoom={setSelectedRoom}
              roomMembers={roomMembers}
              setDisplayMembers={setDisplayMembers}
              displaySelectedMember={displaySelectedMember}
              setDisplaySelectedMember={setDisplaySelectedMember}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
              setDisplayRoomMessages={setDisplayRoomMessages}
              setDisplayPrivateMessages={setDisplayPrivateMessages}
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
