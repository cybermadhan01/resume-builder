import React from "react";
import MainNavbar from "@/components/navigation/MainNavbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen" data-id="9zgks9z0i" data-path="src/components/layout/MainLayout.tsx">
      <MainNavbar />
      <main className="flex-grow" data-id="ilii4k49r" data-path="src/components/layout/MainLayout.tsx">
        {children}
      </main>
      <footer className="border-t py-8" data-id="e17y0rged" data-path="src/components/layout/MainLayout.tsx">
        <div className="container mx-auto px-4 text-center text-gray-500" data-id="r52qneud2" data-path="src/components/layout/MainLayout.tsx">
          <p data-id="h2q3j64wz" data-path="src/components/layout/MainLayout.tsx">© {new Date().getFullYear()} ATSResume. All rights reserved.</p>
        </div>
      </footer>
    </div>);

};

export default MainLayout;