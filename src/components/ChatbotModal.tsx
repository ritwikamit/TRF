import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, ExternalLink } from 'lucide-react';
import { STUDIO_INFO } from '../data/projects';
import { sendChatMessage, ChatMessage } from '../utils/aiChatbot';
import { playShutterClick } from '../utils/audio';

interface ChatbotModalProps {
  onOpenInquiry?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: `Namaste! Welcome to **The Royal Films** (TRF).\n\nI am your AI Studio Concierge, trained on Niraj Singh's photography archives, 4K cinema gear, packages, and booking schedule.\n\nHow can I help plan your wedding visual story today?`,
    timestamp: new Date()
  }
];

const QUICK_PROMPTS = [
  'Wedding Packages & Pricing',
  '4K Cinema & Drone Gear',
  'Pre-Wedding Concept Shoots',
  'Check Date Availability',
  'Delivery & Album Timeline'
];

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleToggle = () => {
    playShutterClick();
    setIsOpen(!isOpen);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    playShutterClick();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(text, [...messages, userMessage]);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        action: response.action
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `We'd love to discuss this with you directly! Please tap below to chat with Niraj Singh on WhatsApp at +91 70043 75740.`,
        timestamp: new Date(),
        action: {
          type: 'whatsapp',
          label: 'WhatsApp Studio Directly',
          url: STUDIO_INFO.whatsappUrl
        }
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    playShutterClick();
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* 1. Chatbot Floating Trigger Button - Positioned exactly above the Scroll Up button with matching size (w-12 h-12) & alignment (left-6) */}
      <div className="fixed bottom-20 left-6 z-40">
        <button
          onClick={handleToggle}
          aria-label={isOpen ? 'Close TRF AI Concierge' : 'Open TRF AI Concierge'}
          title="TRF AI Wedding Assistant"
          className="group relative flex items-center justify-center w-12 h-12 bg-black/85 hover:bg-black text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md border border-white/10 hover:border-[#FF6B00] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        >
          {/* Subtle live indicator dot in brand orange */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#FF6B00] border-2 border-black animate-pulse" />

          {isOpen ? (
            <X className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <MessageSquare className="w-4 h-4 text-white stroke-[2.2] group-hover:text-[#FF6B00] transition-colors" />
          )}
        </button>
      </div>

      {/* 2. Luxury Floating Chatbot Drawer/Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TRF AI Concierge"
          className="fixed bottom-36 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[calc(100vh-160px)] bg-[#0C0C0C]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 select-text"
        >
          {/* Top Brand Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-white/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white tracking-wide uppercase font-mono">
                    TRF Concierge
                  </h3>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
                </div>
                <p className="text-[10px] text-neutral-400 font-mono">
                  Trained on Studio Archives
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chatbot"
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-neutral-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B00] text-white rounded-tr-sm font-medium shadow-md'
                      : 'bg-[#181818] border border-white/10 text-neutral-200 rounded-tl-sm whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Action Button attached to message */}
                {msg.action && (
                  <div className="mt-2 ml-1">
                    {msg.action.type === 'whatsapp' && msg.action.url ? (
                      <a
                        href={msg.action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white text-[11px] font-mono tracking-wider transition-all border border-white/20"
                      >
                        <span>{msg.action.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          if (onOpenInquiry) onOpenInquiry();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white text-[11px] font-mono tracking-wider transition-all border border-white/20"
                      >
                        <span>{msg.action.label}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-1.5 bg-[#181818] border border-white/10 rounded-2xl px-3.5 py-2 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-1.5 border-t border-white/10 bg-[#121212] overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-neutral-300 font-mono tracking-wide transition-colors shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 bg-[#141414] border-t border-white/10 shrink-0">
            <div className="flex items-center gap-2 bg-[#0A0A0A] border border-white/15 rounded-xl px-3 py-1.5 focus-within:border-[#FF6B00] transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about packages, gear, dates..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-neutral-500 text-xs focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send query"
                className="p-1.5 bg-[#FF6B00] disabled:bg-neutral-800 text-white rounded-lg transition-transform active:scale-95 disabled:pointer-events-none"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-[9px] text-neutral-500 font-mono">
              <span>Studio: Gaya, Bihar</span>
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B00] hover:underline"
              >
                Direct WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
