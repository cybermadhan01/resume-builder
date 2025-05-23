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
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import GDPRCompliancePage from "./pages/GDPRCompliancePage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import MainNavbar from "./components/navigation/MainNavbar";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/ats-checker" element={<ATSCheckerPage />} />
              <Route path="/resetpassword" element={<ResetPasswordPage />} />
              <Route path="/onauthsuccess" element={<AuthSuccessPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPolicyPage />} />
              <Route path="/gdpr" element={<GDPRCompliancePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/history" element={<HistoryPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;