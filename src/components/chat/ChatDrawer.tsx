
import React, { useState, useRef, useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, X, Share, FileText } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { getScanHistory } from '@/services/storageService';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  scanData?: any;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your supervisor. Feel free to share any NFC scan data you need help with or ask for instructions.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate supervisor response
    setTimeout(() => {
      const responses = [
        'Thanks for the update. Please proceed with the next scan.',
        'I\'ve reviewed the data. Everything looks good.',
        'Can you provide more details about this scan?',
        'Please follow protocol B for this type of tag.',
        'Good work! Continue with the current procedure.',
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleShareRecentScan = () => {
    const recentScans = getScanHistory();
    if (recentScans.length === 0) {
      toast.error('No recent scans to share');
      return;
    }

    const latestScan = recentScans[0];
    const scanMessage: Message = {
      id: Date.now().toString(),
      text: `Sharing recent scan data from ${new Date(latestScan.timestamp).toLocaleString()}`,
      isUser: true,
      timestamp: new Date(),
      scanData: latestScan,
    };

    setMessages(prev => [...prev, scanMessage]);
    toast.success('Scan data shared with supervisor');

    // Simulate supervisor response to shared data
    setTimeout(() => {
      const responses = [
        'Data received. This scan looks normal, continue with standard procedure.',
        'I see the scan data. Please verify the ID format and rescan if needed.',
        'Good scan quality. You can proceed to the next step.',
        'The data structure looks correct. Mark this as completed.',
      ];
      
      const supervisorResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, supervisorResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[80vh] flex flex-col">
        <DrawerHeader className="border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DrawerTitle>Supervisor Chat</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
            <div className="py-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  scanData={message.scanData}
                />
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 space-y-3 flex-shrink-0">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShareRecentScan}
                className="flex-shrink-0"
              >
                <Share className="h-4 w-4 mr-1" />
                Share Latest Scan
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Type your message to supervisor..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
