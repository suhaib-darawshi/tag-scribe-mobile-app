
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="rounded-full bg-blue-100 p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="h-12 w-12 text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! This page doesn't exist
        </p>
        
        <Button 
          className="btn-gradient px-8 py-6"
          onClick={() => window.location.href = '/'}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
