import React, { useState, useRef, useEffect } from "react";
import Navbar1 from "./components/Navbar1";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

export default function GeminiChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Insider. Ask me anything about DSA or coding!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: response.text || "(No response)" },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Error: Unable to connect to Gemini API." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e293b] to-[#172554] flex flex-col">
      <Navbar1 />
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-6">
        <div className="w-full max-w-2xl bg-gradient-to-br from-[#1e293b] to-[#312e81] rounded-2xl shadow-2xl border border-blue-900/30 backdrop-blur-md bg-opacity-90 p-0 flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line font-mono tracking-tight leading-relaxed break-words ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-blue-50 text-blue-900 rounded-bl-none border border-blue-200"
                  }`}
                  style={{
                    background: msg.role === "assistant" ? "linear-gradient(90deg, #f8fafc 80%, #e0e7ff 100%)" : undefined,
                    fontFamily: msg.role === "assistant" ? 'Fira Mono, Menlo, Monaco, Consolas, monospace' : undefined,
                    whiteSpace: 'pre-wrap',
                  }}
                  dangerouslySetInnerHTML={msg.role === "assistant" ? { __html: msg.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-300 rounded p-2 overflow-x-auto my-2">$1</pre>') } : undefined}
                >
                  {msg.role === "assistant" ? null : msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2 rounded-2xl shadow bg-blue-100 text-blue-900 rounded-bl-none animate-pulse">
                  Generating response...    
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-blue-900/20 bg-gradient-to-r from-[#1e293b] to-[#312e81] p-4 rounded-b-2xl"
          >
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-blue-200 px-4 py-2 rounded-xl border border-blue-800 focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow transition disabled:opacity-60"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
