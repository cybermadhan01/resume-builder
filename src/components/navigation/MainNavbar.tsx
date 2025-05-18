import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, CheckSquare, Home, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MainNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const routes = [
  { path: "/", label: "Home", icon: <Home className="h-5 w-5 mr-2" /> },
  { path: "/resume-builder", label: "Resume Builder", icon: <FileText className="h-5 w-5 mr-2" /> },
  { path: "/ats-checker", label: "ATS Checker", icon: <CheckSquare className="h-5 w-5 mr-2" /> }];


  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-gray-800 bg-black text-white sticky top-0 z-50" data-id="abm3z6kgh" data-path="src/components/navigation/MainNavbar.tsx">
      <div className="container mx-auto px-4" data-id="r0hriqwr3" data-path="src/components/navigation/MainNavbar.tsx">
        <div className="flex h-16 items-center justify-between" data-id="r0cl0zt8n" data-path="src/components/navigation/MainNavbar.tsx">
          <div className="flex items-center gap-2" data-id="j2zkan9rc" data-path="src/components/navigation/MainNavbar.tsx">
            <Link to="/" className="font-bold text-xl flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text" data-id="5ymelsl5m" data-path="src/components/navigation/MainNavbar.tsx">ATS</span>
              <span className="text-white" data-id="x6hnviw92" data-path="src/components/navigation/MainNavbar.tsx">Resume</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" data-id="8t31ovje9" data-path="src/components/navigation/MainNavbar.tsx">
            {routes.map((route) =>
            <Button
              key={route.path}
              variant={isActive(route.path) ? "default" : "ghost"}
              asChild>

                <Link to={route.path} className="flex items-center">
                  {route.icon}
                  {route.label}
                </Link>
              </Button>
            )}
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-4" data-id="6evzhnvcd" data-path="src/components/navigation/MainNavbar.tsx">
            {isAuthenticated ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        {user?.Name?.[0] || user?.Email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
                  <DropdownMenuItem className="py-2">
                    <User className="mr-2 h-4 w-4" />
                    <span data-id="tiqoshonl" data-path="src/components/navigation/MainNavbar.tsx">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span data-id="8bf2mhdyj" data-path="src/components/navigation/MainNavbar.tsx">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> :

            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => setAuthModalOpen(true)}>

                Sign In
              </Button>
            }
          </div>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only" data-id="25a7jovbo" data-path="src/components/navigation/MainNavbar.tsx">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-gray-900 text-white border-gray-800">
              <div className="flex flex-col gap-4 mt-8" data-id="hut42iq4x" data-path="src/components/navigation/MainNavbar.tsx">
                {routes.map((route) =>
                <Button
                  key={route.path}
                  variant={isActive(route.path) ? "default" : "ghost"}
                  asChild
                  onClick={() => setIsOpen(false)}
                  className="justify-start">

                    <Link to={route.path} className="flex items-center">
                      {route.icon}
                      {route.label}
                    </Link>
                  </Button>
                )}
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="mt-8 pt-4 border-t border-gray-800" data-id="pdmhtqdz4" data-path="src/components/navigation/MainNavbar.tsx">
                {isAuthenticated ?
                <div className="space-y-4" data-id="kvkwoirb9" data-path="src/components/navigation/MainNavbar.tsx">
                    <div className="flex items-center gap-4 px-2" data-id="qrra2q8bg" data-path="src/components/navigation/MainNavbar.tsx">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          {user?.Name?.[0] || user?.Email?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div data-id="4zf1gtqwt" data-path="src/components/navigation/MainNavbar.tsx">
                        <p className="font-medium" data-id="nctrwnlnt" data-path="src/components/navigation/MainNavbar.tsx">{user?.Name || user?.Email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div> :

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => {
                    setIsOpen(false);
                    setAuthModalOpen(true);
                  }}>

                    Sign In
                  </Button>
                }
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)} />

    </header>);

};

export default MainNavbar;