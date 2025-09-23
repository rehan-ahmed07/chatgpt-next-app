// ...existing code...
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { newChat, addMessageToChat, setChatTyping, Chat } from '@/lib/store/features/chatSlice'
import { Ellipsis, SendHorizontal } from "lucide-react";

/**
 * Simple chat-style page adapted for an AI chatting app using Tailwind / shadcn-style utilities.
 * This replaces the admin dashboard UI with a focused chat layout.
 *
 * Notes:
 * - Keeps file-level "use client" so client hooks work.
 * - Replace simulated assistant response with a real API call to your /api/ai route when ready.
 */

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  createdAt: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "m1",
      role: "system",
      text: "You are connected to the AI assistant. Ask anything.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "m2",
      role: "assistant",
      text: "Hi! I can help you build, debug, and iterate on code. What would you like to do today?",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch()
  const activeChatId = useAppSelector(s => s.chat.activeChatId)
  const isTyping = useAppSelector(s => s.chat.chats.find(c => c.id === activeChatId)?.typing ?? false)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    // keep focus in the composer after messages change (useful after send)
    if (textareaRef.current) textareaRef.current.focus({ preventScroll: true });
  }, [messages, isTyping]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setSending(true);

    // Ensure there's an active chat; create one if not
  let chatId: string | null = activeChatId ?? null;
    if (!chatId) {
      const action = newChat(text.split(' ').slice(0, 6).join(' '));
      // read payload.id from the action object returned by the action creator
  chatId = (action.payload as Chat).id ?? null;
      dispatch(action);
    }

    // add user message to chat store
    if (chatId) {
      dispatch(addMessageToChat({ chatId, message: userMsg }));
      dispatch(setChatTyping({ chatId, typing: true }));
    }

    // Simulated assistant response - replace with real API call to /api/ai when available
    // Example:
    // const res = await fetch('/api/ai', { method: 'POST', body: JSON.stringify({ prompt: text }) })
    // const json = await res.json()
    // setMessages(prev => [...prev, { id: ..., role: 'assistant', text: json.answer, createdAt: new Date().toISOString() }])
    setTimeout(() => {
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: `Simulated response to: "${text.trim()}"`,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setSending(false);
      if (chatId) {
        dispatch(addMessageToChat({ chatId, message: assistantMsg }));
        dispatch(setChatTyping({ chatId, typing: false }));
      }
    }, 800);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex h-full min-h-[88vh] flex-col">
      {/* <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-2 text-white">
            AI
          </div>
          <div className="text-lg font-semibold">Assistant</div>
          <div className="ml-3 text-sm text-muted-foreground">Chat mode</div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-1 rounded bg-muted/40">Model: gpt-sim</span>
          <span className="px-2 py-1 rounded bg-muted/40">Streaming: off</span>
        </div>
      </header> */}

      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-6" style={{ paddingBottom: 140 }}>
            <div className="mx-auto max-w-6xl space-y-4">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm shadow-sm ${
                      m.role === "user"
                        ? "bg-zinc-50 dark:bg-zinc-700 text-primary"
                        : m.role === "system"
                        ? "bg-zinc-50 dark:bg-zinc-700 text-primary italic"
                        : "bg-zinc-50 dark:bg-zinc-700 text-primary italic"
                    }`}
                  >
                    <div>{m.text}</div>
                    <div className="mt-1 text-xs opacity-60 text-right">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {(isTyping || sending) && (
                <div className="flex justify-start">
                  <div className="max-w-[18%] rounded-lg px-4 py-2 text-sm shadow-sm bg-zinc-50 dark:bg-zinc-700 text-primary">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-200"
                        style={{ animation: 'typing-bounce 1s infinite', animationDelay: '0ms' }}
                        aria-hidden
                      />
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-200"
                        style={{ animation: 'typing-bounce 1s infinite', animationDelay: '150ms' }}
                        aria-hidden
                      />
                      <span
                        className="inline-block w-2 h-2 rounded-full bg-zinc-800 dark:bg-zinc-200"
                        style={{ animation: 'typing-bounce 1s infinite', animationDelay: '300ms' }}
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>
          </div>

          {/* Composer (fixed, aligned with content) */}
          <div
            className="composer-fixed border-t px-4 py-3 bg-background/80 backdrop-blur-sm shadow-lg"
          >
            <div className="chat-composer-inner mx-auto max-w-6xl px-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className=""
              >
                <div className="flex gap-3 items-center flex-col md:flex-row">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Message"
                    placeholder="Type a message and press Enter to send (Shift+Enter for newline)..."
                    className="min-h-[44px] max-h-40 w-full resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{ minWidth: 0 }}
                  />
                
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 md:mt-0 md:ml-1 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 md:py-5 text-sm font-medium text-white disabled:opacity-60 shrink-0"
                >
                  {sending ? <Ellipsis /> : <SendHorizontal />}
                </button>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div>Tip: Press Enter to send</div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        // Clear composer only
                        setInput("");
                        textareaRef.current?.focus();
                      }}
                      className="rounded bg-muted/40 px-2 py-1 hover:bg-muted/30"
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        // Reset conversation to the initial system prompt
                        setMessages([
                          {
                            id: "m1",
                            role: "system",
                            text: "You are connected to the AI assistant. Ask anything.",
                            createdAt: new Date().toISOString(),
                          },
                        ]);
                        setInput("");
                        textareaRef.current?.focus();
                      }}
                      className="rounded px-2 py-1 hover:bg-muted/30"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}