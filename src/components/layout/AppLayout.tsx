
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  hideNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title = 'NFC Reader/Writer',
  showBack = false,
  hideNav = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            {showBack && !isHomePage && (
              <Button 
                variant="ghost" 
                className="mr-2 px-1" 
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-xl font-medium text-gray-900">{title}</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {!hideNav && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
