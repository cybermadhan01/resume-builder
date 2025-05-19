import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Upload, FileText, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type ScoringResult = {
  overallScore: number;
  keywordMatch: {
    score: number;
    matches: string[];
    missing: string[];
  };
  formatScore: number;
  contentScore: number;
  recommendations: string[];
};

const mockJobDescription = `
Senior Full Stack Developer

Company: TechInnovate Solutions
Location: Remote (US)

Job Description:
We are seeking a Senior Full Stack Developer to join our growing team. The ideal candidate will have extensive experience with React, Node.js, and database technologies. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and mentoring junior developers.

Requirements:
- 5+ years of experience in full stack development
- Proficiency in React, Redux, and frontend development
- Strong knowledge of Node.js, Express, and RESTful APIs
- Experience with MongoDB or other NoSQL databases
- Familiarity with AWS or other cloud services
- Strong problem-solving skills and attention to detail
- Excellent communication and teamwork abilities

Responsibilities:
- Design, develop, and maintain web applications
- Collaborate with UX/UI designers to implement user-friendly interfaces
- Write clean, efficient, and well-documented code
- Participate in code reviews and architectural discussions
- Troubleshoot and debug applications
- Stay up-to-date with emerging trends and technologies

Benefits:
- Competitive salary and benefits package
- Flexible work schedule
- Professional development opportunities
- Collaborative and innovative work environment
`;

const mockResumeText = `
JOHN DOE
Software Developer
john.doe@example.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Versatile Software Developer with 6 years of experience in full stack development. Skilled in React, Node.js, and MongoDB. Passionate about creating efficient, user-friendly applications.

EXPERIENCE
Senior Developer, Tech Solutions Inc.
January 2020 - Present
- Developed and maintained multiple React-based web applications
- Implemented RESTful APIs using Node.js and Express
- Collaborated with design team to create responsive user interfaces
- Improved application performance by 35% through code optimization

Software Developer, Digital Innovations
March 2017 - December 2019
- Built and maintained e-commerce platforms using MERN stack
- Designed and implemented database schemas in MongoDB
- Participated in Agile development processes
- Mentored junior developers on best practices

SKILLS
- Programming: JavaScript, TypeScript, HTML, CSS
- Frontend: React, Redux, Bootstrap, Tailwind CSS
- Backend: Node.js, Express, RESTful APIs
- Database: MongoDB, PostgreSQL
- Tools: Git, Docker, AWS, Jest

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2017
`;

const performATSScoring = (resumeText: string, jobDescription: string): ScoringResult => {
  // This is a simplified mock implementation of ATS scoring logic
  // In a real application, this would be more sophisticated

  // Extract keywords from job description
  const jobKeywords = [
  "React", "Node.js", "full stack", "MongoDB", "Express", "RESTful APIs",
  "JavaScript", "AWS", "frontend", "backend", "development", "web applications"];


  // Check which keywords appear in the resume
  const matches = jobKeywords.filter((keyword) =>
  resumeText.toLowerCase().includes(keyword.toLowerCase())
  );
  const missing = jobKeywords.filter((keyword) =>
  !resumeText.toLowerCase().includes(keyword.toLowerCase())
  );

  // Calculate keyword match score
  const keywordMatchScore = Math.round(matches.length / jobKeywords.length * 100);

  // Score for format (mock logic)
  const formatScore = 85; // Would be based on proper sections, formatting, etc.

  // Score for content quality (mock logic)
  const contentScore = 78; // Would be based on content quality, length, specificity

  // Calculate overall score
  const overallScore = Math.round(keywordMatchScore * 0.5 + formatScore * 0.3 + contentScore * 0.2);

  // Generate recommendations
  const recommendations = [];

  if (missing.length > 0) {
    recommendations.push(`Add missing keywords: ${missing.join(", ")}`);
  }

  if (formatScore < 90) {
    recommendations.push("Improve resume structure with clear section headings (Experience, Skills, Education, etc.)");
  }

  if (contentScore < 85) {
    recommendations.push("Use more quantifiable achievements and specific examples in your experience descriptions");
    recommendations.push("Ensure your most relevant skills are prominently displayed");
  }

  return {
    overallScore,
    keywordMatch: {
      score: keywordMatchScore,
      matches,
      missing
    },
    formatScore,
    contentScore,
    recommendations
  };
};

const ATSCheckerPage = () => {
  const [jobDescription, setJobDescription] = useState(mockJobDescription);
  const [resumeText, setResumeText] = useState(mockResumeText);
  const [scoreResult, setScoreResult] = useState<ScoringResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScore = () => {
    const result = performATSScoring(resumeText, jobDescription);
    setScoreResult(result);

    // Automatically switch to results tab and scroll to it
    setTimeout(() => {
      document.querySelector('[value="results"]')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
      // Scroll to the results section with a slight delay to ensure tab switch is complete
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }, 300);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 transition-all duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ATS Score Checker</h1>
            <p className="text-gray-600">
              Analyze how your resume performs against Applicant Tracking Systems
            </p>
          </div>
          
          <Tabs defaultValue="input" className="space-y-6 animate-in fade-in duration-300">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="results" disabled={!scoreResult}>Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                    <CardDescription>
                      Paste the job description to analyze keyword matches
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Paste job description here..."
                      className="min-h-[300px]"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)} />

                  </CardContent>
                </Card>
                
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <CardHeader>
                    <CardTitle>Your Resume</CardTitle>
                    <CardDescription>
                      Paste your resume text or upload a file
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload size={16} />
                          Upload Resume
                        </Button>
                        <span className="text-sm text-gray-500">or paste below</span>
                      </div>
                      
                      <Textarea
                        placeholder="Paste your resume text here..."
                        className="min-h-[300px]"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)} />

                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleScore} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]">
                      Analyze Resume
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-6" ref={resultsRef}>
              {scoreResult &&
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <CardHeader>
                        <CardTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ATS Scoring Results</CardTitle>
                        <CardDescription>
                          Here's how your resume performs against this job description
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Overall ATS Score</Label>
                            <span className={`font-bold text-lg ${getScoreColor(scoreResult.overallScore)}`}>
                              {scoreResult.overallScore}%
                            </span>
                          </div>
                          <Progress value={scoreResult.overallScore} className="h-4 animate-in slide-in-from-left duration-700" />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6 animate-in fade-in duration-700">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <Label>Keyword Match</Label>
                              <span className={`font-bold ${getScoreColor(scoreResult.keywordMatch.score)}`}>
                                {scoreResult.keywordMatch.score}%
                              </span>
                            </div>
                            <Progress value={scoreResult.keywordMatch.score} className="h-3 animate-in slide-in-from-left duration-500" />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <Label>Format & Structure</Label>
                              <span className={`font-bold ${getScoreColor(scoreResult.formatScore)}`}>
                                {scoreResult.formatScore}%
                              </span>
                            </div>
                            <Progress value={scoreResult.formatScore} className="h-3 animate-in slide-in-from-left duration-500" />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <Label>Content Quality</Label>
                              <span className={`font-bold ${getScoreColor(scoreResult.contentScore)}`}>
                                {scoreResult.contentScore}%
                              </span>
                            </div>
                            <Progress value={scoreResult.contentScore} className="h-3 animate-in slide-in-from-left duration-500" />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Keyword Analysis</h3>
                          
                          <div className="space-y-3">
                            <Label className="text-sm text-gray-600">Keywords Found</Label>
                            <div className="flex flex-wrap gap-2 animate-in fade-in duration-500">
                              {scoreResult.keywordMatch.matches.map((keyword, index) =>
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="mr-1 h-3 w-3" /> {keyword}
                                </Badge>
                            )}
                            </div>
                          </div>
                          
                          {scoreResult.keywordMatch.missing.length > 0 &&
                        <div className="space-y-3">
                              <Label className="text-sm text-gray-600">Missing Keywords</Label>
                              <div className="flex flex-wrap gap-2 animate-in fade-in duration-500">
                                {scoreResult.keywordMatch.missing.map((keyword, index) =>
                            <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    <AlertCircle className="mr-1 h-3 w-3" /> {keyword}
                                  </Badge>
                            )}
                              </div>
                            </div>
                        }
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          <CardTitle className="text-lg bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Recommendations</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {scoreResult.recommendations.length > 0 ?
                      scoreResult.recommendations.map((recommendation, index) =>
                      <Alert key={index} className="text-sm animate-in fade-in duration-500 delay-100">
                              <AlertDescription>{recommendation}</AlertDescription>
                            </Alert>
                      ) :

                      <Alert className="bg-green-50 text-green-700 border-green-200 animate-in fade-in duration-500">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <AlertTitle>Great job!</AlertTitle>
                            <AlertDescription>
                              Your resume is well-optimized for this job description.
                            </AlertDescription>
                          </Alert>
                      }
                      </CardContent>
                    </Card>
                  </div>
                </div>
              }
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>);

};

export default ATSCheckerPage;