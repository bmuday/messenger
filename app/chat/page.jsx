"use client";

import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SearchBar from "../../components/chat/sections/SearchBar";
import { useUserStore } from "../../stores";
import { useEffect, useState } from "react";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import fetchDirectus from "../../hooks/fetchDirectus";

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

  const user = useUserStore((state) => state.user);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

  // fetch public rooms /rooms (server-side call with api key)
  const getPublicRooms = async () => {
    const endpoint = "/items/room";
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
      const { data } = await fetchDirectus(URL, options);
      console.log("data", data);
      setPublicRooms(data);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  // fetch activeMembers
  const getActiveMembers = async () => {
    const endpoint = "/items/member";
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
      const { data } = await fetchDirectus(URL, options);
      console.log("data1", data);
      setActiveMembers(data);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  // fetch room members, no ghost with api endpoint /presence (server-side call with api key)
  const getRoomMembers = async () => {
    const endpoint = "/items/room";
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
    const { data } = await fetchDirectus(URL, options);
    console.log("data2", data);
    setRoomMembers(data);
    const roomMembers = activeMembers?.filter(
      (m) => m.roomId === selectedRoom.id
    );
    // setRoomMembers(roomMembers);
  };

  useEffect(() => {
    getPublicRooms();
    getActiveMembers();
    setSelectedRoom(publicRooms[0]);
  }, []);

  useEffect(() => {
    getRoomMembers();
    // display room members and messages
    setDisplaySelectedMember(false);
    setDisplayMembers(true);
    setDisplayRoomMessages(true);
  }, [selectedRoom]);

  console.log("user", user);
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
      <div className="flex flex-col items-center justify-center h-full p-3 space-y-2 border bg-gray-50">
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
