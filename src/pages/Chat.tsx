import React, { useState } from 'react'
import { Bubble } from '@/components/Bubble'
import { Card } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { AudioLines, SendIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

  const imageSrc= "https://images.unsplash.com/photo-1675516490928-e8fdfdf65ca8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
export const Chat = () => {

  const [start,setStart] = useState<boolean>(false);

   const audioHandler = () => {
      setStart(prev => !prev);
    var startButton = document.getElementById('start');
			var stopButton = document.getElementById('stop');
			var resultElement = document.getElementById('input');

			var recognition = new window.webkitSpeechRecognition();

			recognition.lang = window.navigator.language;
			recognition.interimResults = true;

			startButton?.addEventListener('click', () => { recognition.start(); });
			stopButton?.addEventListener('click', () => { recognition.stop(); });

			recognition.addEventListener('result', (event:any) => {
				const result = event.results[event.results.length - 1][0].transcript;
				resultElement.textContent = result;
			});

   }


  return (
    <div className='bg-white'>
    <Bubble/>
    <div className='flex gap-2'>
    <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
      />
        <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
       />
         <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
       />
         <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
       />
    </div>
    <Bubble/>
    <div className='flex gap-2'>
    <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
      />
        <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
       />
         <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
       />
         <Card
          imageUrl={imageSrc} // Use the imported image
          title="Gucci Shirt"
          description="White Formal Shirt by gucci in affordable price and easy to clean and manage"
          link="#"
       />
    </div>

    <div className="bg-muted px-4 py-3 flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0 resize-none"
          id="input"
        />
         <Button variant="ghost" size="icon" className="rounded-full" onClick={audioHandler} id={start?"start":"stop"}>
         <AudioLines />
         </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>

    </div>
    
  )
}
