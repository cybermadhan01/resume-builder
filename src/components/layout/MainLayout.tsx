import React from "react";
import MainNavbar from "@/components/navigation/MainNavbar";
import Footer from "@/components/layout/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>);

};

export default MainLayout;