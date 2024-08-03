import React, { useEffect, useState } from 'react';
import { Bubble } from '@/components/Bubble';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { AudioLines, Ear, SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

const imageSrc = "https://images.unsplash.com/photo-1675516490928-e8fdfdf65ca8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const Chat = () => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleSubmit = () => {
    // Handle form submission logic here
    window.scrollTo(0, document.body.scrollHeight);
    //make this smoother by referencing end message or something
    setText("")
  }

  useEffect(() => {
    // Initialize the SpeechRecognition instance
    const recog = new (window as any).webkitSpeechRecognition();
    recog.lang = 'en-US';
    recog.interimResults = true;
    recog.continuous = true;
    recog.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setText(transcript);
    };
    setRecognition(recog);
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


  return (
    <div className="bg-white">
      <Bubble />
      <div className="flex gap-2">
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
      </div>
      <Bubble />
      <div className="flex gap-2">
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
        <Card
          imageUrl={imageSrc}
          title="Gucci Shirt"
          description="White Formal Shirt by Gucci in affordable price and easy to clean and manage"
          link="#"
        />
      </div>

      <div className="bg-muted px-4 py-3 flex items-center gap-2 sticky bottom-0">
      <Input
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0 resize-none "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={isRecording ? stopListening : startListening}>
         {/* {isRecording? <AudioLines />: <Ear />} */}
         <AudioLines />
        </Button>
       
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSubmit}>
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
};