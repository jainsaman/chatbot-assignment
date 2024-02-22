import { useChat } from "@/context/chatContext";
import { Chatarea, Sidebar } from "@/components/index";
import { useState } from "react";

export default function ChatContainer() {
  const { messages, addMessage, clearMessages } = useChat();

  return (
    <div className="flex items-center w-full">
      <Sidebar />
      <Chatarea />
    </div>
  );
}
