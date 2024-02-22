"use client";
import { Button } from "./ui/button";
import { UserInput, Message } from ".";
import { useChat } from "@/context/chatContext";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";

export default function Chatarea() {
  const { messages, addMessage, saveChat } = useChat(); // Accessing chat context
  const [saving, setSaving] = useState(false);

  return (
    <main className="flex flex-col-reverse gap-6 items-start justify-start h-90v w-4/5 bg-gray-800 text-gray-200 p-4 relative shadow-inner">
      <UserInput onSend={addMessage} /> {/* Render user input component */}
      {messages ? (
        <div className="flex flex-col w-full gap-2">
          {messages.map((message, index) => (
            <Message
              key={index}
              input={message.message}
              userType={message.type}
            />
          ))}
        </div>
      ) : null}
      {messages.length === 0 ? (
        <div className="flex grow items-center justify-center w-full h-full text-2xl font-semibold text-center">
          Welcome! <br />
          Let me know how I can help you today.
        </div>
      ) : null}
      {messages.length > 0 ? (
        <Button
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-700/50 text-base"
          onClick={() => {
            setSaving(true);
            saveChat();
            setTimeout(() => {
              setSaving(false);
            }, 2000);
          }}
        >
          {saving ? (
            <LuLoader2 className="text-2xl animate-spin" />
          ) : (
            <>Save chat</>
          )}
        </Button>
      ) : null}
    </main>
  );
}
