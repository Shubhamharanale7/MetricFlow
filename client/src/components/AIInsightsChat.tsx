import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  type: "user" | "assistant";
  message: string;
  timestamp: Date;
}

export function AIInsightsChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chatHistory } = trpc.chat.getChatHistory.useQuery();
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory as Message[]);
    }
  }, [chatHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: "msg-" + Date.now(),
      type: "user",
      message: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessageMutation.mutateAsync({ message: input });
      setMessages((prev) => [
        ...prev,
        {
          id: response.id,
          type: "assistant",
          message: response.message,
          timestamp: response.timestamp,
        },
      ]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-none flex flex-col h-96"
    >
      {/* Header */}
      <div className="border-b border-border p-4">
        <h3 className="font-bold">AI Insights Assistant</h3>
        <p className="text-xs text-muted-foreground">Ask about your metrics and get instant insights</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground mb-2">Start a conversation</p>
              <p className="text-xs text-muted-foreground">Ask about your growth, revenue, or user metrics</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-none ${
                  msg.type === "user"
                    ? "bg-black text-white"
                    : "bg-black/5 text-black border border-border"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-black/5 px-4 py-2 rounded-none border border-border">
              <Loader2 size={16} className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask about your metrics..."
          className="rounded-none border-black/20"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-black text-white hover:bg-black/90 rounded-none px-4"
        >
          <Send size={18} />
        </Button>
      </div>
    </motion.div>
  );
}
