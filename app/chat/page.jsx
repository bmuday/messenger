import SideBar from "../(components)/SideBar";
import LeftBar from "../(components)/LeftBar";
import MainBar from "../(components)/MainBar";

export default function Chat() {
  return (
    <div className="flex flex-auto w-full">
      <SideBar />
      <LeftBar />
      <MainBar />
    </div>
  );
}
