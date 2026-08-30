import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle, 
  Compass, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  RotateCcw, 
  Lightbulb,
  X
} from 'lucide-react';
import { ChatMessage, StudentProfile, CareerRecommendation } from '../types';

interface MentorChatViewProps {
  studentProfile?: StudentProfile;
  activeCareer?: CareerRecommendation;
  initialContextTopic?: string;
  onClearContext?: () => void;
}

const DEFAULT_SUGGESTIONS = [
  'What high school electives should I register for next semester?',
  'What is a fun, zero-cost beginner project I can build this weekend?',
  'How do I talk with my parents about wanting to pursue this field?',
  'Can I succeed in this career without an expensive 4-year degree?',
  'What does a typical day-in-the-life look like for entry-level professionals?'
];

export const MentorChatView: React.FC<MentorChatViewProps> = ({
  studentProfile,
  activeCareer,
  initialContextTopic,
  onClearContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'mentor',
      text: activeCareer
        ? `Hello! I'm your PathPilot Career Mentor. I see you're exploring **${activeCareer.name}**${
            initialContextTopic ? ` with a focus on **${initialContextTopic}**` : ''
          }. What questions do you have about subjects to take, weekend projects, or degree options?`
        : `Hi there! I'm your PathPilot Career Mentor. Whether you want to know how school subjects connect to jobs, compare degrees vs bootcamps, or find fun beginner projects to try, I'm here to help. What's on your mind?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: DEFAULT_SUGGESTIONS.slice(0, 3),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          studentProfile,
          currentCareer: activeCareer,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      const mentorMessage: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: data.reply || "I'm always here to help you brainstorm next steps for your educational journey!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: data.suggestedPrompts || DEFAULT_SUGGESTIONS.slice(0, 2),
      };

      setMessages((prev) => [...prev, mentorMessage]);
    } catch (err) {
      console.error('Error contacting mentor chatbot:', err);
      const errorMessage: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: "AI couldn't respond right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'What high school electives should I register for next semester?',
          'What is a fun, zero-cost beginner project I can build this weekend?',
        ],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'mentor',
        text: `Fresh chat started! What career or education question would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: DEFAULT_SUGGESTIONS.slice(0, 3),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-8.5rem)] min-h-[550px]">
      {/* Mentor Header Card */}
      <div className="bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-4 sm:p-5 shadow-xs mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#B88448] text-white flex items-center justify-center font-bold shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-display text-[#3D3A35] dark:text-[#FDFBF7]">
                AI Career & Education Mentor
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#4A6550]" />
            </div>
            <p className="text-[11px] text-[#736E65] dark:text-[#A39E93]">
              Supportive, student-focused advice for courses, projects & future paths
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCareer && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#EBF2ED] dark:bg-[#202E24] border border-[#4A6550]/30 text-[#2D4534] dark:text-[#B5D6BE] text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#4A6550]" />
              <span>{activeCareer.name}</span>
              {onClearContext && (
                <button
                  onClick={onClearContext}
                  title="Clear career focus"
                  className="hover:text-[#C87D55] ml-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          <button
            id="reset-mentor-chat-btn"
            onClick={handleResetChat}
            title="Reset conversation"
            className="p-2 rounded-xl border border-[#DFD7CB] dark:border-[#383531] text-[#736E65] hover:text-[#3D3A35] dark:hover:text-[#FDFBF7] hover:bg-[#FAF8F5] dark:hover:bg-[#2F2C29] text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-[#FAF8F5]/80 dark:bg-[#1F1D1B]/80 border border-[#E8E2D9] dark:border-[#383531] rounded-3xl p-4 sm:p-6 space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-[#3D3A35] dark:bg-[#EFECE6] text-white dark:text-[#262422]'
                    : 'bg-[#B88448] text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#3A5341] text-[#FDFBF7] rounded-tr-xs'
                      : 'bg-white dark:bg-[#262422] text-[#3D3A35] dark:text-[#EFECE6] border border-[#E8E2D9] dark:border-[#383531] rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`text-[10px] mt-2 text-right ${
                      isUser ? 'text-[#D5EAD9]' : 'text-[#8C867A]'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* Suggested prompt chips under mentor answers */}
                {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-2.5 py-1 rounded-lg bg-[#EFEAE1] dark:bg-[#2F2C29] hover:bg-[#E2DDD3] dark:hover:bg-[#3D3934] text-[#5C574F] dark:text-[#D5D0C7] hover:text-[#2D4534] dark:hover:text-[#B5D6BE] text-[11px] font-medium transition-all text-left border border-[#DFD7CB] dark:border-[#383531] cursor-pointer"
                      >
                        💡 {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading typing indicator */}
        {loading && (
          <div className="flex gap-3 max-w-2xl mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-[#B88448] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] rounded-tl-xs text-xs text-[#736E65] dark:text-[#A39E93] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B88448] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#B88448] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#B88448] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1">Thinking with educational guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white dark:bg-[#262422] border border-[#E8E2D9] dark:border-[#383531] p-2 rounded-2xl shadow-xs"
        >
          <input
            type="text"
            id="mentor-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              activeCareer
                ? `Ask about ${activeCareer.name}, subjects, projects, degree costs...`
                : 'Ask about high school electives, beginner projects, college vs bootcamp...'
            }
            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent text-[#3D3A35] dark:text-[#FDFBF7] placeholder:text-[#8C867A] focus:outline-none"
          />
          <button
            type="submit"
            id="mentor-send-msg-btn"
            disabled={!input.trim() || loading}
            className={`p-2.5 rounded-xl font-bold transition-all ${
              input.trim() && !loading
                ? 'bg-[#3A5341] hover:bg-[#2D4233] text-[#FDFBF7] shadow-xs cursor-pointer'
                : 'bg-[#EFEAE1] dark:bg-[#2F2C29] text-[#8C867A] cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between text-[11px] text-[#736E65] dark:text-[#A39E93] px-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A6550] dark:text-[#7D9D85] shrink-0" />
            <span>AI mentor guidance provides exploratory suggestions only • Discuss all academic decisions with parents and school counselors</span>
          </div>
        </div>
      </div>
    </div>
  );
};
