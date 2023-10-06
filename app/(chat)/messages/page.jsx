import MessagesBar from "@/components/chat/MessagesBar";

export default function Messages() {
  return (
    <div className="flex w-full h-full">
      <MessagesBar />
      <MessageChannel />
    </div>
  );
}
