import { Montserrat } from "next/font/google";
import { Navigation, ChatContainer } from "@/components";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen w-full flex-col items-center ${montserrat.className}`}
    >
      <Navigation />
      <ChatContainer />
    </main>
  );
}
