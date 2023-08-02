import { useState } from "react";
import { Upload } from "lucide-react";

export default function AddMessage() {
  const [message, setMessage] = useState("");
  return (
    <footer className="w-full border rounded h-15">
      <form className="flex items-center w-full h-full">
        <input
          className="w-[80%] h-full border px-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter the message..."
        />
        <div className="flex items-center px-5 py-2">
          <Upload className="mr-2 cursor-pointer" />
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
