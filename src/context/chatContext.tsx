import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";

interface Message {
  message: string;
  type: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: string, type: string) => void;
  clearMessages: () => void;
  saveChat: () => void;
  savedChats: { timestamp: number; messages: Message[] }[];
  openChat: (messages: Message[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [savedChats, setSavedChats] = useState<
    { timestamp: number; messages: Message[] }[]
  >(() => {
    const savedChats =
      typeof window !== "undefined" ? localStorage.getItem("savedChats") : null;
    return savedChats ? JSON.parse(savedChats) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedChats", JSON.stringify(savedChats));
    }
  }, [savedChats]);

  useEffect(() => {
    const cleanupLocalStorage = () => {
      // Clear localStorage when the window/tab is about to unload
      localStorage.removeItem("savedChats");
    };

    // Add event listener for beforeunload event
    window.addEventListener("beforeunload", cleanupLocalStorage);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  const addMessage = (message: string, type: string) => {
    const newMessage = { message, type };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const openChat = (messages: Message[]) => {
    setMessages([]);
    setMessages(messages);
  };

  const saveChat = () => {
    const newSavedChat = { timestamp: Date.now(), messages };
    setSavedChats((prevSavedChats) => [...prevSavedChats, newSavedChat]);

    setTimeout(() => {
      clearMessages();
      toast.success("Chat saved successfully!", {
        duration: 2000,
      });
    }, 2000);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        saveChat,
        savedChats,
        openChat,
      }}
    >
      {children}
      <Toaster position="top-center" />
    </ChatContext.Provider>
  );
};
