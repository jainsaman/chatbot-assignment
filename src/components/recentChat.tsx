import { MdOutlineOpenInNew } from "react-icons/md";
import { Button } from "./ui/button";
import { useChat } from "@/context/chatContext";

export default function RecentChat() {
  const { savedChats, openChat } = useChat();

  // Function to format timestamp into "DD/MM, HH:MM AM/PM"
  function formatTimestamp(timestamp: string | number | Date) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${day}/${month}, ${formattedHours}:${minutes} ${ampm}`;
  }

  // Extract timestamps and format them
  const formattedTimestamps = savedChats.map((chat) => ({
    timestamp: formatTimestamp(chat.timestamp),
    data: chat.messages,
  }));

  return (
    <>
      {savedChats.length === 0 ? null : (
        <div className="flex flex-col gap-y-2 w-full">
          {formattedTimestamps.map((chat, index) => (
            <Button
              key={index}
              className="bg-gray-700 hover:bg-gray-800 w-full text-sm flex justify-between text-base"
              onClick={() => openChat(chat.data)}
            >
              {chat.timestamp}
              <MdOutlineOpenInNew />
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
