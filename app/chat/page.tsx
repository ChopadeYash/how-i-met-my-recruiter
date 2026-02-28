"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const QUICK_PROMPTS = [
  "What does a Senior Java Developer role involve day-to-day?",
  "How is the work culture at Google for engineers?",
  "What's the salary for a Gen AI Engineer with 3 years of experience?",
  "What skills should I learn to become a Full Stack Developer?",
  "Is this JD realistic for a junior developer?",
];

function ChatUI() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSentInitial = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialQ && !hasSentInitial.current) {
      hasSentInitial.current = true;
      sendMessage(initialQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Sorry, something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col" style={{ height: "calc(100vh - 64px - 72px)" }}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">AI Job Assistant</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Ask about roles, JDs, companies, salaries, and skills. Scoped to job market questions only.
        </p>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto rounded-xl border p-4 mb-4 flex flex-col gap-4"
        style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
            <div className="text-4xl">💼</div>
            <div>
              <p className="font-medium mb-1">Ask me anything about jobs</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Role breakdowns · JD analysis · Company culture · Salary ranges
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-lg">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm px-4 py-2.5 rounded-lg border transition-all hover:border-indigo-500"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
              style={{
                background: m.role === "user" ? "var(--accent)" : "var(--bg-card)",
                border: m.role === "assistant" ? "1px solid var(--border)" : "none",
                color: m.role === "user" ? "white" : "var(--text-secondary)",
              }}
            >
              {m.role === "user" ? "U" : "AI"}
            </div>
            <div
              className="max-w-[80%] px-4 py-3 text-sm leading-relaxed chat-prose whitespace-pre-wrap"
              style={{
                background: m.role === "user" ? "var(--accent)" : "var(--bg-card)",
                color: m.role === "user" ? "white" : "var(--text-primary)",
                borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              }}
            >
              {m.content || (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--accent)", animationDelay: "300ms" }} />
                </span>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a role, company, salary, or JD..."
          className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none focus:border-indigo-500 transition-colors"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: "var(--accent)" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-96 text-sm" style={{ color: "var(--text-secondary)" }}>
          Loading...
        </div>
      }
    >
      <ChatUI />
    </Suspense>
  );
}
