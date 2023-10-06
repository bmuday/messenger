import SideBar from "@/components/chat/Sidebar";

export default function ChatLayout({ children }) {
  return (
    <div className="flex w-full h-full ">
      <SideBar />
      {children}
    </div>
  );
}
