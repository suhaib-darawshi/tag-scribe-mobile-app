
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import ChatDrawer from './ChatDrawer';

const FloatingChatButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default FloatingChatButton;
