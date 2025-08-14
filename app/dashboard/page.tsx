"use client";

import { useState, useEffect } from "react";
import socket from "@/lib/socket";
import ChatContainer from "@/components/ChatContainer";
import { Card, CardContent } from "@/components/ui/card";

function getCookie(name: string) {
  return document.cookie.split("; ").find(row => row.startsWith(`${name}=`))?.split("=")[1];
}

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

interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
}

interface ServerMessage {
  _id: string;
  content?: string;
  text?: string;
  message?: string;
  sender: string | { _id: string; name?: string; avatar?: string };
  createdAt?: string;
  sentiment?: "positive" | "neutral" | "negative";
  clientId?: string;
}

export default function Dashboard() {
  const userIdFromCookie = getCookie("userId");

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user] = useState({
    id: userIdFromCookie ? decodeURIComponent(userIdFromCookie) : "",
    name: `User ${Math.floor(Math.random() * 100)}`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
  });
  const [sentimentStats, setSentimentStats] = useState<SentimentStats>({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onReceiveMessage = (serverMsg: ServerMessage) => {
      const uiMsg: Message = {
        id: serverMsg._id ?? `msg-${Date.now()}`,
        text: serverMsg.content ?? serverMsg.text ?? serverMsg.message ?? "",
        user: {
          id: typeof serverMsg.sender === "object" ? serverMsg.sender?._id : serverMsg.sender,
          name: typeof serverMsg.sender === "object" ? serverMsg.sender?.name ?? "User" : "User",
          avatar: typeof serverMsg.sender === "object" ? serverMsg.sender?.avatar : undefined,
        },
        timestamp: serverMsg.createdAt ?? new Date().toISOString(),
        sentiment: serverMsg.sentiment ?? "neutral",
      };

      setMessages(prev => {
        if (serverMsg.clientId) {
          const replaced = prev.map(m => (m.id === serverMsg.clientId ? uiMsg : m));
          return replaced.some(m => m.id === uiMsg.id) ? replaced : [...replaced, uiMsg];
        }
        return [...prev, uiMsg];
      });

      setSentimentStats(prev => {
        const next = { ...prev };
        if (uiMsg.sentiment === "positive") next.positive += 1;
        else if (uiMsg.sentiment === "negative") next.negative += 1;
        else next.neutral += 1;
        return next;
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_message", onReceiveMessage);
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!socket || !text.trim() || !user.id) return;

    const clientId = `c_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const optimistic: Message = {
      id: clientId,
      text,
      user,
      timestamp: new Date().toISOString(),
      sentiment: "pending",
    };
    setMessages(prev => [...prev, optimistic]);

    // Let the server persist and broadcast
    socket.emit("send_message", {
      content: text,
      sender: user.id,
      receiver: null,
      clientId,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-background">
      <Card className="w-full max-w-6xl h-[90vh] shadow-lg bg-card">
        <CardContent className="p-0 h-full">
          <ChatContainer
            messages={messages}
            sendMessage={sendMessage}
            sentimentStats={sentimentStats}
            user={user}
            isConnected={isConnected}
          />
        </CardContent>
      </Card>
    </main>
  );
}
