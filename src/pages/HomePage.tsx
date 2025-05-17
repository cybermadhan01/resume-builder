import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, CheckSquare, Download, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <FileText className="h-12 w-12 text-blue-600" />,
    title: "Modern Resume Templates",
    description: "Choose from a variety of professionally designed templates optimized for ATS compatibility.",
  },
  {
    icon: <CheckSquare className="h-12 w-12 text-green-600" />,
    title: "ATS Score Checker",
    description: "Test your resume against ATS algorithms and get actionable feedback to improve your chances.",
  },
  {
    icon: <BarChart className="h-12 w-12 text-purple-600" />,
    title: "Job Match Analysis",
    description: "Analyze your resume against job descriptions to identify missing keywords and improvement areas.",
  },
  {
    icon: <Download className="h-12 w-12 text-amber-600" />,
    title: "Export Options",
    description: "Download your finished resume in multiple formats including PDF and image files.",
  },
];

const testimonials = [
  {
    quote: "This tool helped me optimize my resume and land interviews at top tech companies. The ATS checker was a game-changer!",
    author: "Sarah J.",
    role: "Software Engineer"
  },
  {
    quote: "After using the resume builder and ATS checker, my interview callback rate increased by 60%. Highly recommended!",
    author: "Michael T.",
    role: "Marketing Manager"
  },
  {
    quote: "The templates are not only beautiful but actually work with ATS systems. I finally got past the automated screening!",
    author: "Alex P.",
    role: "Project Manager"
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create ATS-Optimized Resumes That Get Interviews
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Stand out from the competition with professionally designed resumes that pass through Applicant Tracking Systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/resume-builder">Create Your Resume</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/ats-checker">Check ATS Score</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Job Seekers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to create professional, ATS-optimized resumes that help you land more interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader className="pb-2 text-center">
                  <div className="mx-auto">{feature.icon}</div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create professional, ATS-optimized resumes in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Choose a Template</h3>
              <p className="text-gray-600">Select from our collection of ATS-optimized resume templates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Add Your Content</h3>
              <p className="text-gray-600">Fill in your details, experience, and skills with our easy-to-use editor</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Check & Export</h3>
              <p className="text-gray-600">Analyze your resume's ATS score and download in your preferred format</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600">
              <Link to="/resume-builder" className="flex items-center gap-2">
                Get Started Now <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of job seekers have used our tools to improve their resumes and get more interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4 text-amber-500">
                    {"★".repeat(5)}
                  </div>
                  <p className="italic text-gray-700 mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Land Your Next Job?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Create an ATS-optimized resume today and increase your chances of getting interviews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/resume-builder">Create Your Resume</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/ats-checker">Check ATS Score</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="font-bold text-xl flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">ATS</span>Resume
              </h2>
              <p className="text-gray-600 mt-2">Create professional, ATS-optimized resumes</p>
            </div>
            <div className="flex gap-8">
              <Link to="#" className="text-gray-600 hover:text-blue-600">About</Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600">Privacy</Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600">Terms</Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>© {new Date().getFullYear()} ATSResume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;