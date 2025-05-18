import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import ATSCheckerPage from "./pages/ATSCheckerPage";
import NotFound from "./pages/NotFound";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthSuccessPage from "./pages/AuthSuccessPage";
import MainNavbar from "./components/navigation/MainNavbar";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <MainNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume-builder" element={<ResumePage />} />
            <Route path="/ats-checker" element={<ATSCheckerPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/onauthsuccess" element={<AuthSuccessPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;