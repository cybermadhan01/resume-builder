import React from "react";
import MainNavbar from "@/components/navigation/MainNavbar";

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
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ATSResume. All rights reserved.</p>
        </div>
      </footer>
    </div>);

};

export default MainLayout;