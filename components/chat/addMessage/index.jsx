import { useState } from "react";
import { Upload } from "lucide-react";

const handleSubmit = (e) => {
  e.preventDefault();
  const conn = peer.connect(peerId);
  conn.on("open", () => {
    conn.send({ sender: username, message, sentAt: Date.now() });
  });
};

export default function AddMessage({ setRoomMessages, setPrivateMessages }) {
  const [message, setMessage] = useState("");
  return (
    <footer className="w-full border rounded h-15">
      <form onSubmit={handleSubmit} className="flex items-center w-full h-full">
        <input
          className="w-[80%] h-full border px-5"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter the message..."
        />
        <div className="flex justify-center w-[20%] items-center px-5 py-2">
          <Upload className="mr-5 cursor-pointer" />
          <button
            className="p-2 font-semibold text-white transition bg-black rounded-lg cursor-pointer hover:shadow-lg duration-3000"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </footer>
  );
}
