import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";

// Define the structure of a single message
interface Message {
  message: string;
  type: string;
}

// Define the structure of the context
interface ChatContextType {
  messages: Message[]; // Array to store current chat messages.
  addMessage: (message: string, type: string) => void; // Function to add a new message to the chat.
  clearMessages: () => void; // Function to clear all messages from the chat, i.e., start a new chat.
  saveChat: () => void; // Function to save the current chat session.
  savedChats: { timestamp: number; messages: Message[] }[]; // Array to store saved chat sessions.
  openChat: (messages: Message[]) => void; // Function to open a chat session with provided messages.
}

// Create a context to manage the chat state and provide it at the top level of the application
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Custom hook to access the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

// ChatProvider component to manage the chat state and provide it to the rest of the application.
export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [savedChats, setSavedChats] = useState<
    { timestamp: number; messages: Message[] }[]
  >(() => {
    // Initialize savedChats state from localStorage, if available
    const savedChats =
      typeof window !== "undefined" ? localStorage.getItem("savedChats") : null;
    return savedChats ? JSON.parse(savedChats) : [];
  });

  // Effect to synchronize savedChats state with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedChats", JSON.stringify(savedChats));
    }
  }, [savedChats]);

  // Effect to clear localStorage on window/tab unload
  useEffect(() => {
    const cleanupLocalStorage = () => {
      localStorage.removeItem("savedChats");
    };

    window.addEventListener("beforeunload", cleanupLocalStorage);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  // Function to add a new message to the chat
  const addMessage = (message: string, type: string) => {
    const newMessage = { message, type };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Function to clear all messages from the chat
  const clearMessages = () => {
    setMessages([]);
  };

  // Function to open a chat session with provided messages
  const openChat = (messages: Message[]) => {
    setMessages([]);
    setMessages(messages);
  };

  // Function to save the current chat session
  const saveChat = () => {
    const newSavedChat = { timestamp: Date.now(), messages };
    setSavedChats((prevSavedChats) => [...prevSavedChats, newSavedChat]);

    setTimeout(() => {
      clearMessages();
      // Display success toast indicating chat is saved
      toast.success("Chat saved successfully!", {
        duration: 2000,
      });
    }, 2000);
  };

  // Provide the chat context and its values to the children components
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
