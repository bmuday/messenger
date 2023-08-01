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
  setSelectedMember,
}) {
  const membersTrigger = document.querySelector(
    "[aria-controls='radix-:r0:-content-members']"
  );

  const handleClick = (r) => {
    console.log("room", r);
    setSelectedRoom(r);
    console.log("trigger", membersTrigger);
    membersTrigger && membersTrigger.click();
  };

  if (displaySelectedMember) {
    return <SelectedMember />;
  } else {
    return (
      <Tabs defaultValue="rooms" className="flex flex-col w-60 bg-gray-50">
        <TabsList>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="rooms">
          <div className="flex flex-col">
            {publicRooms.map((r) => (
              <button key={r.id} onClick={() => handleClick(r)}>
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
}
