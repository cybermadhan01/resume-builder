import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, FileText, CheckSquare, Home } from "lucide-react";

const MainNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: "/", label: "Home", icon: <Home className="h-5 w-5 mr-2" /> },
    { path: "/resume-builder", label: "Resume Builder", icon: <FileText className="h-5 w-5 mr-2" /> },
    { path: "/ats-checker", label: "ATS Checker", icon: <CheckSquare className="h-5 w-5 mr-2" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-bold text-xl flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">ATS</span>Resume
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {routes.map(route => (
              <Button
                key={route.path}
                variant={isActive(route.path) ? "default" : "ghost"}
                asChild
              >
                <Link to={route.path} className="flex items-center">
                  {route.icon}
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                {routes.map(route => (
                  <Button
                    key={route.path}
                    variant={isActive(route.path) ? "default" : "ghost"}
                    asChild
                    onClick={() => setIsOpen(false)}
                    className="justify-start"
                  >
                    <Link to={route.path} className="flex items-center">
                      {route.icon}
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;