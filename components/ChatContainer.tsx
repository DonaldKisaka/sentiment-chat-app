"use client";

import { Card, CardContent } from "./ui/card";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import SentimentSummary from "./SentimentSummary";

interface Message {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string | Date;
  sentiment: "positive" | "neutral" | "negative" | "pending";
}

interface ChatContainerProps {
  messages?: Message[];
  sendMessage?: (text: string) => void;
  sentimentStats?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  roomId?: string;
  isConnected?: boolean;
}

const ChatContainer = ({
  messages = [],
  sendMessage,
  sentimentStats = { positive: 0, neutral: 0, negative: 0 },
  user = { id: "1", name: "User", avatar: "" },
  roomId = "general",
  isConnected = false,
}: ChatContainerProps) => {

  // Function to handle sending a new message
  const handleSendMessage = (text: string) => {
    if (sendMessage) {
      sendMessage(text);
    }
  };

  // Add pending count to sentiment stats
  const statsWithPending = {
    ...sentimentStats,
    pending: messages.filter((m) => m.sentiment === "pending").length,
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] bg-background border shadow-lg flex flex-col">
      <CardContent className="flex flex-col h-full p-0">
        <div className="p-4 border-b bg-muted/20">
          <h2 className="text-xl font-semibold">Chat Room: {roomId}</h2>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            ></span>
            <span>{isConnected ? "Connected" : "Connecting..."}</span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <MessageList messages={messages} currentUserId={user.id} />
        </div>

        <div className="border-t">
          <SentimentSummary stats={statsWithPending} />
          <MessageInput
            onSendMessage={handleSendMessage}
            isLoading={!isConnected}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContainer;
