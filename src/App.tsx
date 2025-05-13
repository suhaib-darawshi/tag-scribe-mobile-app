
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NfcProvider } from "@/contexts/NfcContext";
import HomePage from "./pages/HomePage";
import ReadNfc from "./pages/ReadNfc";
import WriteIdPage from "./pages/WriteIdPage";
import ViewDetails from "./pages/ViewDetails";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NfcProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/read" element={<ReadNfc />} />
            <Route path="/write" element={<WriteIdPage />} />
            <Route path="/view/:id" element={<ViewDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NfcProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
