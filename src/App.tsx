import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import CapacityChecker from "./pages/CapacityChecker";
import PauseTools from "./pages/PauseTools";
import Journal from "./pages/Journal";
import Guide from "./pages/Guide";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import AdminGuide from "./pages/AdminGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/capacity-checker" element={<CapacityChecker />} />
            <Route path="/pause-tools" element={<PauseTools />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/admin/guide" element={<AdminGuide />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:handle" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
