import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChatProvider } from "@/context/chatContext"; // Context provider to manage chat data at the top level of the web app.

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <Component {...pageProps} />
    </ChatProvider>
  );
}
