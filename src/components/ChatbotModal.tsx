import React, { useState, useRef, useEffect } from 'react';
import { X, Send, RefreshCw, ChevronDown, ExternalLink, MessageSquare } from 'lucide-react';
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
    text: `Namaste! Welcome to **The Royal Films**.\n\nI'm with Niraj Singh's studio team here in Gaya, Bihar. How can I help with your wedding photography, 4K cinema films, or dates?`,
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
        text: `We'd love to discuss this directly with you! Please message Niraj Singh on WhatsApp at +91 70043 75740.`,
        timestamp: new Date(),
        action: {
          type: 'whatsapp',
          label: 'WhatsApp Niraj Singh',
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
      {/* 1. Chatbot Floating Trigger Button - Aligned with Scroll Up button (w-12 h-12) */}
      <div className="fixed bottom-20 left-4 sm:left-6 z-40">
        <button
          onClick={handleToggle}
          aria-label={isOpen ? 'Close TRF Studio Chat' : 'Chat with TRF Studio'}
          title="TRF Wedding Concierge"
          className="group relative flex items-center justify-center w-12 h-12 bg-black/90 hover:bg-black text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
        >
          {/* Subtle live indicator dot in brand orange like before */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#FF6B00] border-2 border-black animate-pulse" />

          {isOpen ? (
            <X className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <MessageSquare className="w-4 h-4 text-white stroke-[2.2] group-hover:text-[#FF6B00] transition-colors" />
          )}
        </button>
      </div>

      {/* 2. Floating Chatbot Modal - Highly Optimized for Smartphone & Desktop */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TRF Studio Chat"
          className="fixed bottom-20 sm:bottom-36 left-3 sm:left-6 z-50 w-[calc(100vw-24px)] sm:w-[385px] h-[510px] max-h-[calc(100vh-100px)] bg-[#0C0C0C]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300 select-text"
        >
          {/* Top Brand Header with Distinctive Director Display Picture */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 bg-[#141414] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              {/* Director Portrait DP with Live Status & Signature Dots */}
              <div className="relative w-10 h-10 rounded-full border-2 border-white/25 shrink-0 shadow-md overflow-hidden bg-neutral-900 group">
                <img
                  src="/assets/images/director_avatar.jpg"
                  alt="Niraj Singh - Film Director"
                  className="w-full h-full object-cover object-top"
                />
                {/* Live green active badge */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16A34A] border-2 border-black" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white tracking-wide uppercase font-mono">
                    Niraj Singh
                  </h3>
                  <span className="text-[9px] px-1.5 py-[0.5px] rounded bg-white/10 text-neutral-300 font-mono">
                    Director
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  The Royal Films · Active Now
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
                title="Close Chat"
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body with Smooth Touch Momentum */}
          <div
            className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 text-xs text-neutral-200"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.sender === 'bot' ? (
                  <div className="flex items-end gap-2 max-w-[92%]">
                    <img
                      src="/assets/images/director_avatar.jpg"
                      alt="Niraj Singh"
                      className="w-6 h-6 rounded-full object-cover object-top shrink-0 border border-white/20 mb-1"
                    />
                    <div className="bg-[#181818] border border-white/10 text-neutral-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 leading-relaxed whitespace-pre-line shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed bg-[#FF6B00] text-white rounded-tr-sm font-medium shadow-md">
                    {msg.text}
                  </div>
                )}

                {/* Optional Action Button attached to message */}
                {msg.action && (
                  <div className="mt-2 ml-1">
                    {msg.action.type === 'whatsapp' && msg.action.url ? (
                      <a
                        href={msg.action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white text-[11px] font-mono tracking-wider transition-all border border-white/20 active:scale-95"
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF6B00] text-white text-[11px] font-mono tracking-wider transition-all border border-white/20 active:scale-95"
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
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-neutral-300 font-mono tracking-wide transition-colors shrink-0 disabled:opacity-50 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Form - 16px font-size on mobile prevents Safari auto-zoom */}
          <div className="p-3 bg-[#141414] border-t border-white/10 shrink-0">
            <div className="flex items-center gap-2 bg-[#0A0A0A] border border-white/15 rounded-xl px-3 py-2 sm:py-1.5 focus-within:border-[#FF6B00] transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about dates, packages, gear..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-neutral-500 text-base sm:text-xs focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send query"
                className="p-2 sm:p-1.5 bg-[#FF6B00] disabled:bg-neutral-800 text-white rounded-lg transition-transform active:scale-95 disabled:pointer-events-none shrink-0"
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
                WhatsApp +91 70043 75740 ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
