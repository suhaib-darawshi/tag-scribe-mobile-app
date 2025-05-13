
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { History, ClipboardPen, Scan, UserRound, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <History className="h-6 w-6" /> 
    },
    { 
      name: 'Write', 
      path: '/write', 
      icon: <ClipboardPen className="h-6 w-6" /> 
    },
    { 
      name: 'Scan', 
      path: '/read', 
      icon: <Scan className="h-6 w-6" /> 
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: <UserRound className="h-6 w-6" /> 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <Cog className="h-6 w-6" /> 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center gap-1",
              location.pathname === item.path 
                ? "text-blue-600" 
                : "text-gray-500"
            )}
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
