import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, CheckSquare, Star, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";

const resumeTemplates = [
{
  id: 1,
  title: "Basic Clean",
  description: "A clean, straightforward design perfect for most industries",
  thumbnail: "/placeholder.svg",
  ratings: 4.8,
  downloads: 1234
},
{
  id: 2,
  title: "Modern Professional",
  description: "A contemporary design with stylish elements for creative fields",
  thumbnail: "/placeholder.svg",
  ratings: 4.9,
  downloads: 982
},
{
  id: 3,
  title: "Executive Elite",
  description: "An elegant, sophisticated layout for senior positions",
  thumbnail: "/placeholder.svg",
  ratings: 4.7,
  downloads: 756
},
{
  id: 4,
  title: "Tech Innovator",
  description: "A cutting-edge design for tech professionals and developers",
  thumbnail: "/placeholder.svg",
  ratings: 4.9,
  downloads: 842
}];


const features = [
{
  icon: <Sparkles className="h-10 w-10 text-purple-500" />,
  title: "ATS-Optimized Templates",
  description: "Our templates are designed to pass through ATS systems with ease"
},
{
  icon: <Star className="h-10 w-10 text-pink-500" />,
  title: "AI-Powered Suggestions",
  description: "Get smart content recommendations based on your field and experience"
},
{
  icon: <TrendingUp className="h-10 w-10 text-indigo-500" />,
  title: "Job Match Analysis",
  description: "See how well your resume matches specific job descriptions"
}];


const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Discover & Create</span> <br />
                Extraordinary Resumes
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-300">
                Build ATS-optimized resumes that get you noticed. Stand out to employers and land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setAuthModalOpen(true);
                      return;
                    }
                    window.location.href = '/resume-builder';
                  }}
                >
                  Create Resume
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-black/50 backdrop-blur border-purple-500 text-white hover:bg-black/70">

                  <Link to="/ats-checker">Check ATS Score</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Main NFT-style resume showcase */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg blur-3xl"></div>
                <Card className="w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/50 relative z-10">
                  <CardContent className="p-6">
                    <img src="/placeholder.svg" alt="Resume Preview" className="w-full h-auto rounded" />
                    <div className="mt-4">
                      <h3 className="text-xl font-bold">Premium Resume Template</h3>
                      <p className="text-gray-300 mt-1">Optimized for 98% ATS compatibility</p>
                    </div>
                  </CardContent>
                </Card>
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Templates Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Trending Templates</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                New
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Popular
              </Button>
              <Button variant="ghost" size="sm" className="text-white bg-gray-800">
                Featured
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumeTemplates.map((template) =>
            <Card key={template.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all overflow-hidden">
                <div className="relative">
                  <img src={template.thumbnail} alt={template.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{template.title}</h3>
                    <div className="flex items-center text-sm text-yellow-500">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {template.ratings}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{template.downloads} downloads</span>
                    <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                    onClick={() => {
                      if (!isAuthenticated) {
                        setAuthModalOpen(true);
                        return;
                      }
                      // Navigate to resume builder with this template
                    }}>

                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="link" 
              className="text-purple-400 hover:text-purple-300"
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthModalOpen(true);
                  return;
                }
                window.location.href = '/resume-builder';
              }}
            >
              View all templates <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Your Resume Journey Today
              </h2>
              <p className="text-gray-300 mb-8">
                Our AI-powered resume builder helps you create professional, ATS-optimized resumes in minutes. Get personalized suggestions and expert feedback to make your application stand out.
              </p>
              <div className="space-y-6">
                {features.map((feature, index) =>
                <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 bg-gradient-to-br from-purple-900 to-pink-900 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-10">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setAuthModalOpen(true);
                      return;
                    }
                    // Navigate to the resume builder
                  }}>

                  Create Your Resume
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg blur-3xl"></div>
                <img
                  src="/placeholder.svg"
                  alt="Resume Builder Interface"
                  className="relative z-10 rounded-lg border border-purple-500/50" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="font-bold text-xl flex items-center">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">ATS</span>
                <span className="text-white">Resume</span>
              </h2>
              <p className="text-gray-400 mt-2">Create professional, ATS-optimized resumes</p>
            </div>
            <div className="flex gap-8">
              <Link to="#" className="text-gray-400 hover:text-purple-400">About</Link>
              <Link to="#" className="text-gray-400 hover:text-purple-400">Privacy</Link>
              <Link to="#" className="text-gray-400 hover:text-purple-400">Terms</Link>
              <Link to="#" className="text-gray-400 hover:text-purple-400">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ATSResume. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)} />

    </div>);

};

export default HomePage;