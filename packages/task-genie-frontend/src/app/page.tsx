import Image from "next/image";
import { ChatUIComponent } from '../components/ui/chat-uicomponent';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <ChatUIComponent />
    </main>
  );
}