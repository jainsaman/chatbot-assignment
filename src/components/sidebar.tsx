import { Button } from "./ui/button";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { useChat } from "@/context/chatContext";
import { RecentChat } from ".";

export default function Sidebar() {
  const { clearMessages, savedChats } = useChat();

  const handleNewChat = () => {
    clearMessages();
  };

  return (
    <div className="flex flex-col items-start h-90v w-1/5 bg-gray-900 text-gray-200 border-r-2 border-gray-300/25 p-4 gap-y-4">
      <Button
        className="bg-gray-700 hover:bg-gray-800 w-full text-sm flex justify-between text-lg"
        onClick={handleNewChat}
      >
        New Chat
        <MdOutlineQuestionAnswer />
      </Button>
      <div className="flex w-full gap-x-2 items-center text-sm text-gray-400">
        Recent chats
        <hr className="h-0.5 grow border-y border-gray-700 opacity-100" />
      </div>
      {savedChats.length === 0 ? null : <RecentChat />}
    </div>
  );
}
