import SideBar from "../(components)/SideBar";
import LeftBar from "../(components)/LeftBar";
import MainBar from "../(components)/MainBar";

export default function Messages() {
  return (
    <div className="chat">
      <SideBar />
      <LeftBar />
      <MainBar />
    </div>
  );
}
