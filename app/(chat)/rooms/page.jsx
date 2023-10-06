import RoomsBar from "@/components/chat/RoomsBar";
import RoomChannel from "@/components/chat/RoomChannel";

export default function Rooms() {
  return (
    <div className="flex w-full h-full">
      <RoomsBar />
      <RoomChannel />
    </div>
  );
}
