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
    <div className="min-h-screen bg-black text-white" data-id="yfibrgr0e" data-path="src/pages/HomePage.tsx">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" data-id="x2h9qv6um" data-path="src/pages/HomePage.tsx">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black z-0" data-id="raxwyu4re" data-path="src/pages/HomePage.tsx"></div>
        <div className="container mx-auto px-4 relative z-10" data-id="816d3z7tq" data-path="src/pages/HomePage.tsx">
          <div className="flex flex-col lg:flex-row items-center gap-12" data-id="4s89it7o9" data-path="src/pages/HomePage.tsx">
            <div className="lg:w-1/2 text-center lg:text-left" data-id="t1vryoca8" data-path="src/pages/HomePage.tsx">
              <h1 className="text-4xl md:text-6xl font-bold mb-6" data-id="6hkfkbkm6" data-path="src/pages/HomePage.tsx">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent" data-id="ms80smitg" data-path="src/pages/HomePage.tsx">Discover & Create</span> <br data-id="v0l27gczr" data-path="src/pages/HomePage.tsx" />
                Extraordinary Resumes
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-300" data-id="gfhee9bd9" data-path="src/pages/HomePage.tsx">
                Build ATS-optimized resumes that get you noticed. Stand out to employers and land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-id="6d4atbgs2" data-path="src/pages/HomePage.tsx">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
                  <Link to="/resume-builder">Create Resume</Link>
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
            <div className="lg:w-1/2 flex justify-center" data-id="cnbc5alig" data-path="src/pages/HomePage.tsx">
              <div className="relative w-full max-w-md" data-id="etyz57hu9" data-path="src/pages/HomePage.tsx">
                {/* Main NFT-style resume showcase */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg blur-3xl" data-id="s9jb5m3mg" data-path="src/pages/HomePage.tsx"></div>
                <Card className="w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/50 relative z-10">
                  <CardContent className="p-6">
                    <img src="/placeholder.svg" alt="Resume Preview" className="w-full h-auto rounded" data-id="sq4faj68l" data-path="src/pages/HomePage.tsx" />
                    <div className="mt-4" data-id="vvqt2jlhg" data-path="src/pages/HomePage.tsx">
                      <h3 className="text-xl font-bold" data-id="x8pp80mgd" data-path="src/pages/HomePage.tsx">Premium Resume Template</h3>
                      <p className="text-gray-300 mt-1" data-id="ubpn5n60q" data-path="src/pages/HomePage.tsx">Optimized for 98% ATS compatibility</p>
                    </div>
                  </CardContent>
                </Card>
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600 rounded-full blur-3xl opacity-20" data-id="rpbcsx4d3" data-path="src/pages/HomePage.tsx"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20" data-id="4al2dcuxq" data-path="src/pages/HomePage.tsx"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Templates Section */}
      <section className="py-16 bg-gray-950" data-id="a3jtc0xhu" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="hz6amgpjs" data-path="src/pages/HomePage.tsx">
          <div className="flex items-center justify-between mb-10" data-id="d917684d8" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl font-bold" data-id="37aq6dxxo" data-path="src/pages/HomePage.tsx">Trending Templates</h2>
            <div className="flex items-center gap-4" data-id="sdnlomf1w" data-path="src/pages/HomePage.tsx">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-id="ooumy30va" data-path="src/pages/HomePage.tsx">
            {resumeTemplates.map((template) =>
            <Card key={template.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all overflow-hidden">
                <div className="relative" data-id="e2nllel9l" data-path="src/pages/HomePage.tsx">
                  <img src={template.thumbnail} alt={template.title} className="w-full h-48 object-cover" data-id="yu2skg05z" data-path="src/pages/HomePage.tsx" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" data-id="9338ojl4g" data-path="src/pages/HomePage.tsx"></div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2" data-id="qzpg6fchx" data-path="src/pages/HomePage.tsx">
                    <h3 className="font-bold" data-id="vkjnqvnt8" data-path="src/pages/HomePage.tsx">{template.title}</h3>
                    <div className="flex items-center text-sm text-yellow-500" data-id="g8ylw13s8" data-path="src/pages/HomePage.tsx">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {template.ratings}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4" data-id="b6fl0pnv6" data-path="src/pages/HomePage.tsx">{template.description}</p>
                  <div className="flex justify-between items-center" data-id="n4k33c74t" data-path="src/pages/HomePage.tsx">
                    <span className="text-xs text-gray-500" data-id="wbq8gt6a6" data-path="src/pages/HomePage.tsx">{template.downloads} downloads</span>
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

          <div className="text-center mt-8" data-id="a1arbqta3" data-path="src/pages/HomePage.tsx">
            <Button variant="link" className="text-purple-400 hover:text-purple-300">
              View all templates <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-20" data-id="cidyxv5ke" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="34p7578iy" data-path="src/pages/HomePage.tsx">
          <div className="flex flex-col lg:flex-row items-center gap-12" data-id="a7xptt9i2" data-path="src/pages/HomePage.tsx">
            <div className="lg:w-1/2" data-id="ha43sfqev" data-path="src/pages/HomePage.tsx">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-id="yc1v4kln9" data-path="src/pages/HomePage.tsx">
                Start Your Resume Journey Today
              </h2>
              <p className="text-gray-300 mb-8" data-id="4bczt3p3x" data-path="src/pages/HomePage.tsx">
                Our AI-powered resume builder helps you create professional, ATS-optimized resumes in minutes. Get personalized suggestions and expert feedback to make your application stand out.
              </p>
              <div className="space-y-6" data-id="7fst83tf7" data-path="src/pages/HomePage.tsx">
                {features.map((feature, index) =>
                <div key={index} className="flex items-start gap-4" data-id="v695tp6mg" data-path="src/pages/HomePage.tsx">
                    <div className="mt-1 bg-gradient-to-br from-purple-900 to-pink-900 p-3 rounded-lg" data-id="com2l1l2f" data-path="src/pages/HomePage.tsx">
                      {feature.icon}
                    </div>
                    <div data-id="nx262l0yy" data-path="src/pages/HomePage.tsx">
                      <h3 className="font-bold text-lg" data-id="l06smdwvu" data-path="src/pages/HomePage.tsx">{feature.title}</h3>
                      <p className="text-gray-400" data-id="3xv7m6s4b" data-path="src/pages/HomePage.tsx">{feature.description}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-10" data-id="mmk7736ke" data-path="src/pages/HomePage.tsx">
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
            <div className="lg:w-1/2" data-id="bp5iectvw" data-path="src/pages/HomePage.tsx">
              <div className="relative" data-id="4z12gek8j" data-path="src/pages/HomePage.tsx">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg blur-3xl" data-id="0i58ewtvz" data-path="src/pages/HomePage.tsx"></div>
                <img
                  src="/placeholder.svg"
                  alt="Resume Builder Interface"
                  className="relative z-10 rounded-lg border border-purple-500/50" data-id="vl3vw5mh1" data-path="src/pages/HomePage.tsx" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12" data-id="gsvvozx7c" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="ynaevh3wl" data-path="src/pages/HomePage.tsx">
          <div className="flex flex-col md:flex-row justify-between items-center" data-id="mrvwh5oio" data-path="src/pages/HomePage.tsx">
            <div className="mb-6 md:mb-0" data-id="1bizy32j6" data-path="src/pages/HomePage.tsx">
              <h2 className="font-bold text-xl flex items-center" data-id="cqfnwa7kv" data-path="src/pages/HomePage.tsx">
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text" data-id="xgg2x7fhf" data-path="src/pages/HomePage.tsx">ATS</span>
                <span className="text-white" data-id="64cxttd1h" data-path="src/pages/HomePage.tsx">Resume</span>
              </h2>
              <p className="text-gray-400 mt-2" data-id="enen9f588" data-path="src/pages/HomePage.tsx">Create professional, ATS-optimized resumes</p>
            </div>
            <div className="flex gap-8" data-id="dtlxe8zkv" data-path="src/pages/HomePage.tsx">
              <Link to="#" className="text-gray-400 hover:text-purple-400">About</Link>
              <Link to="#" className="text-gray-400 hover:text-purple-400">Privacy</Link>
              <Link to="#" className="text-gray-400 hover:text-purple-400">Terms</Link>
              <Link to="#" className="text-gray-400 hover:text-purple-400">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500" data-id="n94bkug1u" data-path="src/pages/HomePage.tsx">
            <p data-id="6sso0oijd" data-path="src/pages/HomePage.tsx">© {new Date().getFullYear()} ATSResume. All rights reserved.</p>
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