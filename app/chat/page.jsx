"use client";

import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SearchBar from "../../components/chat/sections/SearchBar";
import ChatLanding from "../../components/chat/sections/ChatLanding";
import { usePeerStore, useUserStore } from "../../stores";
import { useEffect, useState } from "react";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import { fetchDirectus } from "@/lib/directus";
import { useRouter } from "next/navigation";
import { Peer } from "peerjs";

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
  const member = useUserStore((state) => state.member);
  const setMember = useUserStore((state) => state.setMember);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

  // Create a peer
  const peer = usePeerStore((state) => state.peer);
  const setPeer = usePeerStore((state) => state.setPeer);

  if (typeof navigator !== undefined && !peer) {
    const initPeer = new Peer();
    setPeer(initPeer);
  } else {
    console.log("peer", peer);
  }

  const retrieveMember = async () => {
    const endpoint = `/items/member?filter[user_id][_eq]=${user.id}`;
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (access_token) options.headers.Authorization = `Bearer ${access_token}`;
    try {
      const { data } = await fetchDirectus(endpoint, options);
      return data;
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    getPublicRooms();
    getActiveMembers();
  }, []);

  useEffect;

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
      setPublicRooms(data);
    } catch (error) {
      router.push("/login");
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    if (publicRooms) {
      setSelectedRoom(publicRooms[0]);
    }
  }, [publicRooms]);

  useEffect(() => {
    if (selectedRoom) {
      setDisplayPrivateMessages(false);
      setDisplayRoomMessages(true);
      getRoomMembers();
    }
  }, [selectedRoom]);

  // fetch activeMembers without me
  const getActiveMembers = async () => {
    try {
      const { data } = await fetchDirectus(
        "/items/room_member?fields=member_id&groupBy[]=member_id"
      );
      const membersId = data.map((m) => m.member_id);
      const { data: members } = await fetchDirectus(
        `/items/member?filter=[id][_in]=[${membersId}]`
      );
      setActiveMembers(members);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  // fetch room members, no ghost with api endpoint /presence (server-side call with api key)
  const getRoomMembers = async () => {
    try {
      const { data } = await fetchDirectus(
        `/items/room_member?filter=[room_id][_eq]=[${selectedRoom?.id}]&fields=member_id?fields=member_id&groupBy[]=member_id`
      );
      const membersId = data?.map((m) => m.member_id);
      const members = activeMembers.filter((m) => membersId.includes(m.id));
      setRoomMembers(members);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (roomMembers) {
      // display room members and messages
      setDisplaySelectedMember(false);
      setDisplayRoomMembers(true);
      setDisplayRoomMessages(true);
    }
  }, [roomMembers]);

  useEffect(() => {
    if (selectedMember) {
      setDisplayRoomMembers(false);
      setDisplaySelectedMember(true);
      setDisplayRoomMessages(false);
      setDisplayPrivateMessages(true);
    } else {
      setDisplaySelectedMember(false);
      setDisplayRoomMembers(true);
    }
  }, [selectedMember]);

  console.log("member", member);

  return (
    <div className="flex w-full h-full">
      <LeftBar />
      <div className="flex flex-col items-center w-full h-full">
        <SearchBar />
        {!member ? (
          <ChatLanding
            retrieveMember={retrieveMember}
            setMember={setMember}
            peer={peer}
          />
        ) : (
          <MainBar
            member={member}
            peer={peer}
            selectedRoom={selectedRoom}
            selectedMember={selectedMember}
            displayRoomMessages={displayRoomMessages}
            displayPrivateMessages={displayPrivateMessages}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center h-full p-3 space-y-2 border bg-gray-50">
        <div className="flex justify-between w-full h-full">
          {displayRoomMembers && roomMembers && (
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
          {displaySelectedMember && selectedMember && (
            <SelectedMember
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
            />
          )}
        </div>
      </div>
    </div>
  );
}
