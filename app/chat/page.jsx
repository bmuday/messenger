"use client";

import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SearchBar from "../../components/chat/sections/SearchBar";
import ChatLanding from "../../components/chat/sections/ChatLanding";
import { usePeerStore, useUserStore } from "../../stores";
import { useState, useEffect } from "react";
import SelectedMember from "../../components/chat/sections/SelectedMember";
import { fetchDirectus } from "@/lib/directus";
import { useRouter } from "next/navigation";
// import { inspect } from "util";

export default function Chat() {
  // Dès la 1e connexion,
  // faire settingsCheck et enregistrer paramètres dans le profil user
  const [publicRooms, setPublicRooms] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomMembers, setRoomMembers] = useState([]);
  const [displayRoomMessages, setDisplayRoomMessages] = useState(true);
  const [displayPrivateMessages, setDisplayPrivateMessages] = useState(false);
  const [displayRoomMembers, setDisplayRoomMembers] = useState(true);
  const [displaySelectedMember, setDisplaySelectedMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const globalPeer = usePeerStore((state) => state.peer);
  const setGlobalPeer = usePeerStore((state) => state.setPeer);
  const user = useUserStore((state) => state.user);
  const member = useUserStore((state) => state.member);
  const setMember = useUserStore((state) => state.setMember);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

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

  const updateMember = async (memberId, peer) => {
    const endpoint = `/items/member/${memberId}`;
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ peer_id: peer }),
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
    // public rooms
    getPublicRooms()
      .then((publicRooms) => {
        console.log("publicRooms", publicRooms);
        // active members
        getActiveMembers()
          .then((activeMembers) => {
            console.log("activeMembers", activeMembers);
          })
          .catch((err) => {
            console.log("err", err);
            setError("No active members");
          });
      })
      .catch((err) => {
        console.log("err", err);
        setError("No public rooms");
      });

    // peer client object
    import("peerjs").then(({ default: Peer }) => {
      let peer;
      if (!globalPeer) {
        peer = new Peer();
        peer.on("open", (id) => {
          setGlobalPeer(peer);
          retrieveMember()
            .then((member) => {
              console.log("member0", member[0]);
              if (!member) {
                setMember(member[0]);
              }
              if (member[0].peer_id !== id) {
                console.log("change");
                updateMember(member[0].id, id).then(() => {
                  setMember({ ...member[0], peer_id: id });
                });
              }
            })
            .catch((err) => {
              console.log("err", err);
              setError("No member");
            });
        });
      } else {
        console.log("globalPeer", globalPeer);
        globalPeer.on("open", (id) => {
          retrieveMember()
            .then((member) => {
              console.log("member0", member[0]);
              if (member) {
                setMember(member[0]);
                console.log("id", member[0].peer_id, id);
                if (member[0].peer_id !== id) {
                  console.log("change");
                  updateMember(member[0].id, id).then(() => {
                    setMember({ ...member[0], peer_id: id });
                  });
                }
              }
            })
            .catch((err) => {
              console.log("err", err);
              setError("No member");
            });
        });
      }
    });
  }, []);

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
      console.log("data", data[0]);
      if (!selectedRoom) setSelectedRoom(data[0]);
      return data;
    } catch (error) {
      router.push("/login");
      console.log("error", error);
      setError(error);
    }
  };

  // fetch activeMembers without me
  const getActiveMembers = async () => {
    try {
      const { data } = await fetchDirectus(
        "/items/room_member?fields=member_id&groupBy[]=member_id"
      );
      const membersId = data.map((m) => m.member_id);
      const { data: activeMembers } = await fetchDirectus(
        `/items/member?filter[id][_in]=${membersId}`
      );
      setActiveMembers(activeMembers);
      return activeMembers;
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  // fetch room members, no ghost with api endpoint /presence (server-side call with api key)
  const getRoomMembers = async (selectedRoom) => {
    try {
      const { data } = await fetchDirectus(
        `/items/room_member?filter[room_id][_eq]=${selectedRoom?.id}&fields=member_id?fields=member_id&groupBy[]=member_id`
      );
      const membersId = data?.map((m) => m.member_id);
      const roomMembers = activeMembers.filter((m) => membersId.includes(m.id));
      setRoomMembers(roomMembers);
      return roomMembers;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setDisplayRoomMessages(true);
    setDisplayPrivateMessages(false);
    if (activeMembers && selectedRoom) {
      //room members
      getRoomMembers(selectedRoom)
        .then((roomMembers) => {
          console.log("roomMembers", roomMembers);
        })
        .catch((err) => {
          console.log("err", err);
          setError("No room members");
        });
    }
  }, [activeMembers, selectedRoom]);

  useEffect(() => {
    setDisplaySelectedMember(false);
    setDisplayRoomMembers(true);
    setDisplayRoomMessages(true);
  }, [roomMembers]);

  useEffect(() => {
    if (selectedMember) {
      setDisplayRoomMembers(false);
      setDisplaySelectedMember(true);
      setDisplayRoomMessages(false);
      setDisplayPrivateMessages(true);

      // Connect to another peer
      const conn = peer.connect(selectedMember?.peer_id);
      peer.on("connection", (conn) => {
        console.log("conn", conn);
        conn.on("data", (data) => {
          // Will print 'hi!'
          console.log(data);
        });
        conn.on("open", () => {
          conn.send({ [member?.firstName]: "hello!" });
        });
      });
    } else {
      setDisplaySelectedMember(false);
      setDisplayRoomMembers(true);
    }
  }, [selectedMember]);

  return (
    <div className="flex w-full h-full">
      <LeftBar />
      <div className="flex flex-col items-center w-full h-full">
        <SearchBar />
        {member ? (
          <MainBar
            member={member}
            selectedRoom={selectedRoom}
            selectedMember={selectedMember}
            displayRoomMessages={displayRoomMessages}
            displayPrivateMessages={displayPrivateMessages}
          />
        ) : (
          <ChatLanding setMember={setMember} peerId={globalPeer?._id} />
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
