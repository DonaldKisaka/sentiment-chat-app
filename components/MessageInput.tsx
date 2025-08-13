"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}


export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage("");
        }
    };

    return (
        <div className="bg-background border-t p-4 w-full">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                    aria-label="Message"
                />
                <Button type="submit" disabled={isLoading || !message.trim()} size="icon" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </div>
    )
}