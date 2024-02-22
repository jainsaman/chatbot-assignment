import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoIosSend } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";

type UserInputProps = {
  onSend: (message: string, type: string) => void;
};

export default function UserInput({ onSend }: UserInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);

  const sendQuery = () => {
    if (inputValue.trim() === "") return; // Don't send empty queries
    setSending(true);
    toast.loading("Fetching response...", {
      duration: 2000,
    });
    onSend(inputValue, "user"); // Pass input value to onSend function
    getResponse();
  };

  const getResponse = async () => {
    try {
      const res = await fetch(`/api/mock?input=${inputValue}`);
      const data = await res.json();
      setInputValue("");
      setTimeout(() => {
        onSend(data.response, data.userType);
        if (res.status === 400) {
          toast.error("Sorry, please try again.", { duration: 1500 });
        }
        setSending(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex gap-2 items-start justify-between w-full">
      <Input
        placeholder="Please enter your query."
        className="text-base border-0 text-gray-700"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        className="text-base gap-1 hover:bg-gray-900/50"
        onClick={sendQuery}
        type="submit"
      >
        {sending ? (
          <LuLoader2 className="text-2xl animate-spin" />
        ) : (
          <>
            Send
            <IoIosSend />
          </>
        )}
      </Button>
      <Toaster position="top-center" />
    </div>
  );
}
