import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bot, X, Send, ExternalLink } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import { getInitialQuestion, getQuestionById } from '../services/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch initial question
  const { data: initialQuestionData, isLoading: questionLoading, error: questionError, refetch: refetchInitialQuestion } = useQuery({
    queryKey: ['initialQuestion'],
    queryFn: getInitialQuestion,
    enabled: isOpen, // Only fetch when chatbot is open
    retry: 2, // Retry 2 times
    retryDelay: 1000,
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchInterval: isOpen ? 10000 : false, // Refetch every 10 seconds when chatbot is open
    staleTime: 0, // Always consider data stale to allow refetching
  });

  // Fetch next question if currentQuestionId changes
  const { data: nextQuestionData } = useQuery({
    queryKey: ['question', currentQuestionId],
    queryFn: () => getQuestionById(currentQuestionId),
    enabled: !!currentQuestionId && isOpen,
    retry: false,
  });

  useEffect(() => {
    if (nextQuestionData?.data) {
      const nextQ = nextQuestionData.data;
      setCurrentQuestion(nextQ);
      setCurrentQuestionId(nextQ.id);
    }
  }, [nextQuestionData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = async (option) => {
    // Add user message (selected option)
    const userMessage = {
      id: Date.now(),
      text: option.option,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Add bot response (answer)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: option.answer,
        sender: 'bot',
        timestamp: new Date(),
        productUrl: option.productUrl || null, // Store product URL if available
      };
      setMessages((prev) => [...prev, botResponse]);

      // If there's a next question, fetch and show it
      if (option.nextQuestionId) {
        setTimeout(async () => {
          try {
            const nextQResponse = await getQuestionById(option.nextQuestionId);
            if (nextQResponse?.data) {
              const nextQ = nextQResponse.data;
              const nextQuestionMessage = {
                id: Date.now() + 2,
                text: nextQ.question,
                sender: 'bot',
                timestamp: new Date(),
                questionId: nextQ.id,
                options: Array.isArray(nextQ.options) ? nextQ.options : [],
              };
              setMessages((prev) => [...prev, nextQuestionMessage]);
              setCurrentQuestionId(nextQ.id);
              setCurrentQuestion(nextQ);
            }
          } catch (error) {
            console.error('Error fetching next question:', error);
          }
        }, 500);
      }
    }, 500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simple response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: 'Thank you for your message! For better assistance, please select from the options above.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Refetch initial question when chatbot opens
  useEffect(() => {
    if (isOpen) {
      refetchInitialQuestion();
    }
  }, [isOpen, refetchInitialQuestion]);

  // Reset messages when chatbot opens and initial question loads or updates
  useEffect(() => {
    if (isOpen && initialQuestionData?.data) {
      const initialQ = initialQuestionData.data;
      
      // Check if we need to update messages
      const firstMessage = messages[0];
      const shouldUpdate = 
        messages.length === 0 || // No messages yet
        (firstMessage?.questionId === initialQ.id && // Same question ID
         (firstMessage?.text !== initialQ.question || // Question text changed
          JSON.stringify(firstMessage?.options || []) !== JSON.stringify(initialQ.options || []))); // Options changed
      
      if (shouldUpdate) {
        setMessages([{
          id: Date.now(),
          text: initialQ.question,
          sender: 'bot',
          timestamp: new Date(),
          questionId: initialQ.id,
          options: Array.isArray(initialQ.options) ? initialQ.options : [],
        }]);
        setCurrentQuestion(initialQ);
        setCurrentQuestionId(initialQ.id);
      }
    } else if (isOpen && questionError && messages.length === 0) {
      // Show fallback message if database question not found
      setMessages([{
        id: 1,
        text: 'Hello! I am codeEntra assistant. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        options: [
          {
            option: 'Our Services',
            answer: 'We offer Web Development, DevOps Solutions, Cloud Services, UX/UI Design, IT Consulting, and Cybersecurity services.',
            nextQuestionId: null
          },
          {
            option: 'Our Products',
            answer: 'We have developed innovative products to solve real-world problems. Visit our Products section to explore them!',
            nextQuestionId: null
          },
          {
            option: 'Internship Program',
            answer: 'We offer amazing internship opportunities. You can apply by visiting our Career section on the website.',
            nextQuestionId: null
          },
          {
            option: 'About codeEntra',
            answer: 'codeEntra is a leading technology solutions provider founded in 2025. We specialize in empowering businesses with innovative technology solutions.',
            nextQuestionId: null
          },
          {
            option: 'Contact Us',
            answer: 'You can reach us through our contact form on this page or email us directly. We would love to hear from you!',
            nextQuestionId: null
          }
        ]
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuestionData?.data, questionError]);

  return (
    <>
      {/* Friendly Colorful Robot Button - Like Image */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          isOpen ? 'w-20 h-24 scale-75' : 'w-32 h-40',
          'transition-all duration-300',
          'hover:scale-110 active:scale-95',
          isOpen ? '' : 'animate-float-robot',
          'cursor-pointer',
          'group'
        )}
        aria-label="Open chatbot"
      >
        {/* Robot Container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Shadow/Glow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-green-600/30 blur-xl rounded-full" />
          
          {/* Robot Body - Main Container */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            
            {/* HEAD SECTION */}
            <div className="relative z-20 mb-1">
              {/* Angular Ears/Points */}
              <div className="absolute -top-2 left-0 right-0 flex justify-between px-2">
                <div className="w-3 h-4 bg-green-700 rounded-tl-lg rounded-tr-sm transform -rotate-12 shadow-md" />
                <div className="w-3 h-4 bg-green-500 rounded-tr-lg rounded-tl-sm transform rotate-12 shadow-md" />
              </div>
              
              {/* Head Container - Box Shape */}
              <div className="relative w-20 h-16 bg-gradient-to-b from-green-600 to-green-800 rounded-lg shadow-lg border-2 border-green-500/50">
                {/* Headphones/Speakers on sides */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-2 border-green-400 shadow-md" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-2 border-green-400 shadow-md" />
                
                {/* Eyes Container */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-3">
                  {/* Left Eye - Concentric Circles */}
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-green-400 relative">
                      <div className="absolute inset-1 rounded-full bg-blue-300 border border-blue-400">
                        <div className="absolute inset-1 rounded-full bg-blue-600">
                          <div className="absolute inset-1 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Eye */}
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-green-400 relative">
                      <div className="absolute inset-1 rounded-full bg-blue-300 border border-blue-400">
                        <div className="absolute inset-1 rounded-full bg-blue-600">
                          <div className="absolute inset-1 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Small Green Details on Face */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded" />
                  <div className="w-1 h-1 bg-green-400 rounded" />
                  <div className="w-1 h-1 bg-green-400 rounded" />
                </div>
              </div>
            </div>
            
            {/* NECK */}
            <div className="w-4 h-2 bg-green-400 rounded mb-0.5 shadow-sm" />
            
            {/* TORSO SECTION */}
            <div className="relative w-16 h-20 bg-gradient-to-b from-green-600 to-green-700 rounded-lg shadow-md border border-green-500/50 flex flex-col items-center">
              {/* White Chest Panel */}
              <div className="w-12 h-8 bg-white rounded mt-2 mb-1 shadow-inner border border-gray-200 relative">
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded" />
              </div>
              
              {/* Arms - Segmented */}
              <div className="absolute -left-4 top-4 flex flex-col items-center gap-1">
                {/* Shoulder Joint */}
                <div className="w-3 h-3 bg-green-500 rounded-full border border-green-400" />
                {/* Upper Arm - Green */}
                <div className="w-4 h-3 bg-green-500 rounded shadow-md" />
                {/* Elbow Joint */}
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {/* Forearm - Green */}
                <div className="w-4 h-3 bg-green-600 rounded shadow-md" />
                {/* Wrist */}
                <div className="w-2 h-2 bg-white rounded-full border border-green-400" />
                {/* Hand - White Mitten */}
                <div className="w-5 h-4 bg-white rounded-b-lg rounded-t-sm shadow-md relative">
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-0.5">
                    <div className="w-0.5 h-1 bg-gray-300 rounded-full" />
                    <div className="w-0.5 h-1 bg-gray-300 rounded-full" />
                    <div className="w-0.5 h-1 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 top-4 flex flex-col items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full border border-green-400" />
                <div className="w-4 h-3 bg-green-500 rounded shadow-md" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="w-4 h-3 bg-green-600 rounded shadow-md" />
                <div className="w-2 h-2 bg-white rounded-full border border-green-400" />
                <div className="w-5 h-4 bg-white rounded-b-lg rounded-t-sm shadow-md relative">
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-0.5">
                    <div className="w-0.5 h-1 bg-gray-300 rounded-full" />
                    <div className="w-0.5 h-1 bg-gray-300 rounded-full" />
                    <div className="w-0.5 h-1 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>
              
              {/* Lower Torso */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-800 rounded-b-lg" />
            </div>
            
            {/* LEGS SECTION */}
            <div className="flex gap-2 mt-1">
              {/* Left Leg */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-lg shadow-md border border-green-500/50">
                  <div className="w-full h-2 bg-green-500 rounded-t-lg mt-1" />
                  <div className="w-full h-2 bg-green-700 mt-1" />
                  <div className="w-full h-2 bg-green-500 mt-1" />
                </div>
                {/* Foot - Green */}
                <div className="relative w-8 h-3 bg-green-500 rounded-lg shadow-lg -mt-1">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full border border-green-300" />
                </div>
              </div>
              
              {/* Right Leg */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-lg shadow-md border border-green-500/50">
                  <div className="w-full h-2 bg-green-500 rounded-t-lg mt-1" />
                  <div className="w-full h-2 bg-green-700 mt-1" />
                  <div className="w-full h-2 bg-green-500 mt-1" />
                </div>
                {/* Foot - Green */}
                <div className="relative w-8 h-3 bg-green-500 rounded-lg shadow-lg -mt-1">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full border border-green-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Chat Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-green-600 to-green-800 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <SheetTitle className="text-white">codeEntra Assistant</SheetTitle>
                  <SheetDescription className="text-green-100 text-xs">
                    We're here to help!
                  </SheetDescription>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {questionLoading && messages.length === 0 && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={cn(
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-2 shadow-sm',
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    )}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-600">Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    {message.productUrl && (
                      <a
                        href={message.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-colors"
                      >
                        <span>Explore Product</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                
                {/* Options for questions */}
                {message.options && Array.isArray(message.options) && message.options.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-col gap-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className={cn(
                            'text-left text-xs px-4 py-2.5 rounded-md',
                            'bg-white border border-green-200 hover:border-green-400',
                            'hover:bg-green-50 transition-colors',
                            'text-gray-700 hover:text-green-700',
                            'shadow-sm hover:shadow',
                            'font-medium'
                          )}
                        >
                          {option.option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by codeEntra
            </p>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Chatbot;
