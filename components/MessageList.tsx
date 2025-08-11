"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, Meh, Frown } from "lucide-react";

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
  
  interface MessageListProps {
    messages: Message[];
    currentUserId?: string;
  }
  
  const MessageList = ({
    messages = [],
    currentUserId = "1",
  }: MessageListProps) => {
    // Helper function to format timestamp
    const formatTime = (date: string | Date) => {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(dateObj);
    };
  
    // Helper function to get sentiment icon and color
    const getSentimentInfo = (sentiment: Message["sentiment"]) => {
      switch (sentiment) {
        case "positive":
          return {
            icon: <Smile className="h-4 w-4" />,
            color: "bg-green-100 text-green-800",
            label: "Positive",
          };
        case "negative":
          return {
            icon: <Frown className="h-4 w-4" />,
            color: "bg-red-100 text-red-800",
            label: "Negative",
          };
        case "neutral":
          return {
            icon: <Meh className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-800",
            label: "Neutral",
          };
        case "pending":
        default:
          return {
            icon: null,
            color: "bg-gray-100 text-gray-800",
            label: "Analyzing...",
          };
      }
    };
  
    return (
      <div className="flex flex-col h-full w-full bg-white rounded-md border border-gray-200">
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.user?.id === currentUserId;
              const { icon, color, label } = getSentimentInfo(message.sentiment);
              const userName = message.user?.name || "Unknown User";
              const userAvatar =
                message.user?.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.user?.id || "default"}`;
  
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`flex-shrink-0 ${isCurrentUser ? "ml-2" : "mr-2"}`}
                    >
                      <Avatar>
                        <AvatarImage src={userAvatar} />
                        <AvatarFallback>
                          {userName
                            ? userName.substring(0, 2).toUpperCase()
                            : "??"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
  
                    <div className="flex flex-col">
                      <div
                        className={`flex items-center ${isCurrentUser ? "justify-end" : "justify-start"} mb-1`}
                      >
                        <span className="text-sm text-gray-500">{userName}</span>
                        <span className="text-xs text-gray-400 mx-2">•</span>
                        <span className="text-xs text-gray-400">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
  
                      <div className="flex items-start space-x-2">
                        <div
                          className={`rounded-lg p-3 ${
                            isCurrentUser
                              ? "bg-primary text-primary-foreground rounded-tr-none"
                              : "bg-gray-100  text-gray-900 rounded-tl-none"
                          }`}
                        >
                          <p>{message.text}</p>
                        </div>
  
                        <Badge
                          variant="outline"
                          className={`flex items-center space-x-1 ${color}`}
                        >
                          {icon}
                          <span className="text-xs">{label}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
  
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };
  
  export default MessageList;