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
  const [inputValue, setInputValue] = useState(""); // State to manage input value
  const [sending, setSending] = useState(false); // State to manage sending state

  const sendQuery = () => {
    if (inputValue.trim() === "") return; // Don't send empty queries
    setSending(true);
    toast.loading("Fetching response...", {
      duration: 2000,
    });
    onSend(inputValue, "user"); // Pass input value to onSend function
    getResponse(); // Fetch response
  };

  const getResponse = async () => {
    try {
      const res = await fetch(`/api/mock?input=${inputValue}`);
      const data = await res.json();
      setInputValue(""); // Clear input value
      setTimeout(() => {
        onSend(data.response, data.userType); // Send response to parent component
        if (res.status === 400) {
          toast.error("Sorry, please try again.", { duration: 1500 });
        } // Show error toast if status is 400
        setSending(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error); //Log error if fetching data fails
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendQuery(); // Call sendQuery function if Enter key is pressed
    }
  };

  return (
    <div className="flex gap-2 items-start justify-between w-full">
      <Input
        placeholder="Please enter your query."
        className="text-base border-0 text-gray-700"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
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
