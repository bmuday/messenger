"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectedMember from "./SelectedMember";

export default function RightBar({
  publicRooms,
  setSelectedRoom,
  roomMembers,
  setDisplayMembers,
  displaySelectedMember,
  setDisplaySelectedMember,
  selectedMember,
  setSelectedMember,
  setDisplayRoomMessages,
  setDisplayPrivateMessages,
}) {
  const [defaultTabValue, setDefaultTabValue] = useState("rooms");

  if (displaySelectedMember) {
    return (
      <SelectedMember
        selectedMember={selectedMember}
        setDisplayMembers={setDisplayMembers}
        setDisplaySelectedMember={setDisplaySelectedMember}
      />
    );
  }
  return (
    <Tabs defaultValue={defaultTabValue} className="flex flex-col w-full">
      <TabsList>
        <TabsTrigger value="rooms">Rooms</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
      </TabsList>
      <TabsContent value="rooms">
        <div className="flex flex-col pt-5">
          {publicRooms.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelectedRoom(r);
                setDisplayPrivateMessages(false);
                setDisplayRoomMessages(true);
                setDefaultTabValue("rooms");
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="members">
        <div className="flex flex-col">
          {roomMembers.map((m) => (
            <Button
              className="flex justify-between px-2"
              variant="outline"
              key={m.id}
              onClick={() => {
                setDisplayMembers(false);
                setDisplaySelectedMember(true);
                setDisplayRoomMessages(false);
                setDisplayPrivateMessages(true);
                setDefaultTabValue("members");
                setSelectedMember(m);
              }}
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {m.firstName}
            </Button>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
