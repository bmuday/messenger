"use client";

import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SearchBar from "../../components/chat/sections/SearchBar";
import { useUserStore } from "../../stores";
import { useEffect, useState } from "react";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import fetchDirectus from "../../hooks/fetchDirectus";
import { useRouter } from "next/navigation";

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
  const [displayRoomMembers, setDisplayRoomMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [displaySelectedMember, setDisplaySelectedMember] = useState(false);
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

  // fetch public rooms /rooms (server-side call with api key)
  const getPublicRooms = async () => {
    const endpoint = "/items/room";
    let options;
    if (access_token)
      options = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

    try {
      const { data } = await fetchDirectus(endpoint, options);
      console.log("data", data);
      setPublicRooms(data);
    } catch (error) {
      router.push("/login");
      console.log("error", error);
      setError(error);
    }
  };

  // fetch activeMembers
  const getActiveMembers = async () => {
    const { data } = await fetchDirectus(
      "/items/room_member?fields=member_id&groupBy[]=member_id"
    );
    const membersId = data.map((m) => m.member_id);
    const { data: members } = await fetchDirectus(
      `/items/member?filter={"id":{"_in":[${membersId}]}}`
    );
    setActiveMembers(members);
  };

  // fetch room members, no ghost with api endpoint /presence (server-side call with api key)
  const getRoomMembers = async () => {
    const { data } = await fetchDirectus(
      `/items/room_member?filter={"room_id":{"_eq":"${selectedRoom?.id}"}}&fields=member_id?fields=member_id&groupBy[]=member_id`
    );
    const membersId = data?.map((m) => m.member_id);
    const roomMembers = activeMembers.filter((m) => membersId.includes(m.id));
    setRoomMembers(roomMembers);
  };

  useEffect(() => {
    getPublicRooms().then(() => {
      getActiveMembers();
      console.log("public", publicRooms);
      const firstRoom = publicRooms[0];
      setSelectedRoom(firstRoom);
    });
  }, []);

  useEffect(() => {
    getRoomMembers().then(() => {
      console.log("selectedRoom", selectedRoom);
      console.log("roomMembers", roomMembers);
    });
    // display room members and messages
    setDisplaySelectedMember(false);
    setDisplayRoomMembers(true);
    setDisplayRoomMessages(true);
  }, [selectedRoom]);
  return (
    <div className="flex w-full h-full">
      <LeftBar />
      <div className="flex flex-col w-full h-full">
        <SearchBar />
        <MainBar
          selectedRoom={selectedRoom}
          selectedMember={selectedMember}
          displayRoomMessages={displayRoomMessages}
          displayPrivateMessages={displayPrivateMessages}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full p-3 space-y-2 border bg-gray-50">
        <div className="flex justify-between w-full h-full">
          {displayRoomMembers && (
            <RightBar
              publicRooms={publicRooms}
              setSelectedRoom={setSelectedRoom}
              roomMembers={roomMembers}
              setDisplayRoomMembers={setDisplayRoomMembers}
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
              setDisplayRoomMembers={setDisplayRoomMembers}
              setDisplaySelectedMember={setDisplaySelectedMember}
            />
          )}
        </div>
      </div>
    </div>
  );
}
