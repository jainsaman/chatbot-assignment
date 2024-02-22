import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChatProvider } from "@/context/chatContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <Component {...pageProps} />
    </ChatProvider>
  );
}
