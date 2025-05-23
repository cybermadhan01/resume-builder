import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Resume Builder</h3>
            <p className="text-gray-300 mb-4">
              Create professional resumes that stand out and get you noticed by recruiters.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/CyberMadhan" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:scale-110" title="Twitter/X">
                <Twitter size={24} className="hover:text-blue-400" />
              </a>
              <a href="https://www.instagram.com/madhan_tentacion" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors hover:scale-110" title="Instagram">
                <Instagram size={24} className="hover:text-pink-500" />
              </a>
              <a href="https://www.linkedin.com/in/g-madhan-kumar-408807253" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors hover:scale-110" title="LinkedIn">
                <Linkedin size={24} className="hover:text-blue-600" />
              </a>
              <a href="https://github.com/cybermadhan01" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors hover:scale-110" title="GitHub">
                <Github size={24} className="hover:text-gray-600" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resume" className="text-gray-300 hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link to="/ats-checker" className="text-gray-300 hover:text-white transition-colors">ATS Checker</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resume Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">Cookies Policy</Link></li>
              <li><Link to="/gdpr" className="text-gray-300 hover:text-white transition-colors">GDPR Compliance</Link></li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-gray-700" />
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>);

};

export default Footer;