import LeftBar from "../../components/chat/sections/LeftBar";
import MainBar from "../../components/chat/sections/MainBar";
import RightBar from "../../components/chat/sections/RightBar";
import SearchBar from "../../components/chat/sections/SearchBar";

export default function Marketplace() {
  return (
    <div className="flex w-full h-full">
      <LeftBar />
      <div className="flex flex-col w-full h-full">
        <SearchBar />
        <main></main>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full p-3 space-y-2 border bg-gray-50">
        <div className="flex justify-between w-full h-full">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
