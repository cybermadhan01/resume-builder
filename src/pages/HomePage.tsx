import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, FileText, CheckSquare, Star, Sparkles, TrendingUp, Award, Globe, BookOpen, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import AuthModal from "@/components/auth/AuthModal";

// Default templates that will be replaced with data from the database
const defaultTemplates = [
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

// Explore more features section
const exploreFeatures = [
{
  icon: <Award className="h-14 w-14 text-orange-500" />,
  title: "Premium Templates",
  description: "Access our library of 100+ premium templates designed by HR professionals"
},
{
  icon: <Globe className="h-14 w-14 text-blue-500" />,
  title: "Industry-Specific Formats",
  description: "Find templates tailored for your specific industry and career level"
},
{
  icon: <BookOpen className="h-14 w-14 text-green-500" />,
  title: "Resume Guide",
  description: "Learn best practices and expert tips for creating impactful resumes"
},
{
  icon: <Zap className="h-14 w-14 text-yellow-500" />,
  title: "Instant Analysis",
  description: "Get real-time feedback on your resume's effectiveness and ATS compatibility"
}];


const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [resumeTemplates, setResumeTemplates] = useState(defaultTemplates);
  const [premiumTemplate, setPremiumTemplate] = useState({
    title: "Premium Resume Template",
    description: "Optimized for 98% ATS compatibility",
    thumbnail: "/placeholder.svg"
  });
  const [activeFilter, setActiveFilter] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch template thumbnails from the database
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await window.ezsite.apis.tablePage(7165, {
          PageNo: 1,
          PageSize: 10,
          OrderByField: "ID",
          IsAsc: false
        });

        if (error) throw error;

        if (data && data.List && data.List.length > 0) {
          // Transform the data to match our template format
          const templates = data.List.map((item) => ({
            id: item.ID,
            title: item.template_name,
            description: item.template_description,
            thumbnail: item.thumbnail_image || "/placeholder.svg",
            ratings: (4.5 + Math.random() * 0.5).toFixed(1), // Simulated ratings
            downloads: Math.floor(500 + Math.random() * 1000) // Simulated downloads
          }));

          setResumeTemplates(templates.length > 0 ? templates : defaultTemplates);

          // Set the premium template to the first template or a default
          if (templates.length > 0) {
            setPremiumTemplate({
              title: templates[0].title,
              description: "Optimized for 98% ATS compatibility",
              thumbnail: templates[0].thumbnail
            });
          }
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Filter templates based on selection
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // In a real implementation, you would fetch different templates based on the filter
    // For now, we'll just simulate it by randomly reordering the templates
    setResumeTemplates((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

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
                    navigate('/resume');
                  }}>

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
                    <img src={premiumTemplate.thumbnail} alt="Resume Preview" className="w-full h-auto rounded" />
                    <div className="mt-4">
                      <h3 className="text-xl font-bold">{premiumTemplate.title}</h3>
                      <p className="text-gray-300 mt-1">{premiumTemplate.description}</p>
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
              <Button
                variant="ghost"
                size="sm"
                className={activeFilter === "new" ? "text-white bg-gray-800" : "text-gray-400 hover:text-white"}
                onClick={() => handleFilterChange("new")}>

                New
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={activeFilter === "popular" ? "text-white bg-gray-800" : "text-gray-400 hover:text-white"}
                onClick={() => handleFilterChange("popular")}>

                Popular
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={activeFilter === "featured" ? "text-white bg-gray-800" : "text-gray-400 hover:text-white"}
                onClick={() => handleFilterChange("featured")}>

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
                      navigate('/resume');
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
                navigate('/resume');
              }}>

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
                    navigate('/resume');
                  }}>

                  Create Your Resume
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg blur-3xl"></div>
                <img
                  src={resumeTemplates.length > 0 ? resumeTemplates[0].thumbnail : "/placeholder.svg"}
                  alt="Resume Builder Interface"
                  className="relative z-10 rounded-lg border border-purple-500/50" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Features Section - New Section */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Explore What We Offer
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our platform provides everything you need to create impressive, professional resumes that stand out to both employers and ATS systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {exploreFeatures.map((feature, index) =>
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-purple-500/10">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-xl shadow-purple-900/20"
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthModalOpen(true);
                  return;
                }
                navigate('/resume');
              }}>
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Join thousands of professionals who have boosted their career success with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-pink-500/30 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-6">
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) =>
                    <Star key={i} className="h-4 w-4 fill-current" />
                    )}
                  </div>
                  <p className="text-gray-300 italic">
                    "I landed three interviews in my first week after using this resume builder. The ATS optimization really works!"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                    JS
                  </div>
                  <div>
                    <p className="font-semibold">Jamie Smith</p>
                    <p className="text-sm text-gray-400">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-6">
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) =>
                    <Star key={i} className="h-4 w-4 fill-current" />
                    )}
                  </div>
                  <p className="text-gray-300 italic">
                    "The templates are elegant and professional. After struggling for months, I finally have a resume I'm proud to share."
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                    MP
                  </div>
                  <div>
                    <p className="font-semibold">Michael Parker</p>
                    <p className="text-sm text-gray-400">Marketing Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="mb-6">
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) =>
                    <Star key={i} className="h-4 w-4 fill-current" />
                    )}
                  </div>
                  <p className="text-gray-300 italic">
                    "The ATS checker gave me valuable insights on how to improve my resume. It's like having a career coach!"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold mr-3">
                    AR
                  </div>
                  <div>
                    <p className="font-semibold">Alex Rodriguez</p>
                    <p className="text-sm text-gray-400">Data Analyst</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              <Link to="/privacy-policy" className="text-gray-400 hover:text-purple-400">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-purple-400">Terms</Link>
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