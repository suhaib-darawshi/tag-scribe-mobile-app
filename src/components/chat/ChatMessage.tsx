
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  scanData?: any;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp, scanData }) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
            SV
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[70%] space-y-2",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-3 py-2",
          isUser 
            ? "bg-blue-600 text-white" 
            : "bg-gray-100 text-gray-900"
        )}>
          <p className="text-sm">{message}</p>
          <p className={cn(
            "text-xs mt-1",
            isUser ? "text-blue-100" : "text-gray-500"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        {scanData && (
          <Card className="w-full mt-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                Shared Scan Data
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-gray-600 space-y-1">
                <div>Type: {scanData.type}</div>
                <div>Time: {new Date(scanData.timestamp).toLocaleString()}</div>
                {Object.keys(scanData.data).length > 0 && (
                  <div>Fields: {Object.keys(scanData.data).join(', ')}</div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
