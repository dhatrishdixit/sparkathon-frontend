import { Oval } from 'react-loader-spinner';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bubble } from '@/components/Bubble';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { AudioLines, Ear, SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const imageSrc = "https://images.unsplash.com/photo-1675516490928-e8fdfdf65ca8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface MessageSchema {
  isAI: boolean;
  text: string;
  suggestions?: string;
  cards?: CardSchema[];
}

interface CardSchema {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

interface ApiResponse {
  Available: boolean;
  Brand: string;
  Category: string;
  Description: string;
  "Product Name": string;
  "Product Url": string;
  "Sale Price": number;
  "Unit Id": string;
  score: number;
}


const fetchAIResponse = async (botMessage: string): Promise<MessageSchema> => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:5001/generate_keywords_and_search",
    headers: {
      "Content-Type": "application/json",
    },
    data: botMessage,
  };

  const result = await axios.request(config);
  const responseData: ApiResponse[] = result.data;

  const cards: CardSchema[] = responseData.map((item, index) => ({
    id: index + 1, // Using index + 1 as a simple id
    imageUrl: "https://via.placeholder.com/150", // Placeholder image as the API doesn't provide image URLs
    title: item["Product Name"],
    description: item.Description,
    price: item["Sale Price"],
  }));

  const aiMessage: MessageSchema = {
    isAI: true,
    text: `Here are some products related to "${botMessage}":`,
    suggestions: "Click on a card to view more details.",
    cards: cards,
  };

  return aiMessage;
};


export const Chat = () => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [messages, setMessages] = useState<MessageSchema[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (text.trim()) {
      const botMessage: MessageSchema = { isAI: false, text: text.trim() };
      setMessages(prev => [...prev, botMessage]);
      setText('');
      setIsLoading(true);

      try {
        const aiResponse = await fetchAIResponse(botMessage.text);
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      } finally {
        setIsLoading(false);  
      }
      
      // Scroll to bottom after state updates
      setTimeout(scrollToBottom, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recog = new (window as any).webkitSpeechRecognition();
      recog.lang = 'en-US';
      recog.interimResults = true;
      recog.continuous = true;
      recog.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setText(transcript);
      };
      setRecognition(recog);
    }
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleCardClick = (card: CardSchema) => {
    navigate(`/product/${card.id}`, { state: { product: card } });
  };

  return (
    <div className="bg-black flex flex-col h-screen ">
      <div className="flex-grow overflow-y-scroll scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-thumb-gray-700 p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.isAI ? 'text-left' : 'text-left'}`}>
            <Bubble text={message.text} isAI={message.isAI} />
            {message.isAI && message.suggestions && (
              <div className="mt-2 mb-1 text-left text-sm text-gray-400">
                {message.suggestions}
              </div>
            )}
            {message.isAI && message.cards && (
              <div className="flex flex-row gap-2 mt-2 overflow-x-auto">
                {message.cards.map((card) => (
                  <div key={card.id} onClick={() => handleCardClick(card)} style={{cursor: 'pointer'}}>
                    <Card
                      imageUrl={card.imageUrl}
                      title={card.title}
                      description={card.description}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="w-full flex justify-center items-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            secondaryColor="rgb(75 85 99 / var(--tw-bg-opacity)"
          />
        </div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 sticky bottom-0">
        <Input
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0 resize-none bg-gray-800 text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-gray-700"
          onClick={isRecording ? stopListening : startListening}
        >
          {isRecording ? <Ear /> : <AudioLines />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-gray-700"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
};