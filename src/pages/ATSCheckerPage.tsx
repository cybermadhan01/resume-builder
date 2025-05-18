import { useState } from "react";
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

  const handleScore = () => {
    const result = performATSScoring(resumeText, jobDescription);
    setScoreResult(result);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" data-id="bu8amfp3f" data-path="src/pages/ATSCheckerPage.tsx">
      <div className="container mx-auto px-4" data-id="jjyj03cdf" data-path="src/pages/ATSCheckerPage.tsx">
        <div className="max-w-6xl mx-auto" data-id="d733qz2pl" data-path="src/pages/ATSCheckerPage.tsx">
          <div className="mb-8 text-center" data-id="x9dk323cz" data-path="src/pages/ATSCheckerPage.tsx">
            <h1 className="text-3xl font-bold mb-2" data-id="axa5gvxis" data-path="src/pages/ATSCheckerPage.tsx">ATS Score Checker</h1>
            <p className="text-gray-600" data-id="b018ojd9f" data-path="src/pages/ATSCheckerPage.tsx">
              Analyze how your resume performs against Applicant Tracking Systems
            </p>
          </div>
          
          <Tabs defaultValue="input" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="results" disabled={!scoreResult}>Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-id="bfi2yw8mw" data-path="src/pages/ATSCheckerPage.tsx">
                <Card>
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
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Resume</CardTitle>
                    <CardDescription>
                      Paste your resume text or upload a file
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4" data-id="iwsw2g1kc" data-path="src/pages/ATSCheckerPage.tsx">
                      <div className="flex items-center gap-2" data-id="f9nbkytct" data-path="src/pages/ATSCheckerPage.tsx">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload size={16} />
                          Upload Resume
                        </Button>
                        <span className="text-sm text-gray-500" data-id="ze22jf8bx" data-path="src/pages/ATSCheckerPage.tsx">or paste below</span>
                      </div>
                      
                      <Textarea
                        placeholder="Paste your resume text here..."
                        className="min-h-[300px]"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)} />

                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleScore}>Analyze Resume</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-6">
              {scoreResult &&
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="jcbnnrpnc" data-path="src/pages/ATSCheckerPage.tsx">
                  <div className="lg:col-span-2 space-y-6" data-id="jaek8625l" data-path="src/pages/ATSCheckerPage.tsx">
                    <Card>
                      <CardHeader>
                        <CardTitle>ATS Scoring Results</CardTitle>
                        <CardDescription>
                          Here's how your resume performs against this job description
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3" data-id="vhyi43dy9" data-path="src/pages/ATSCheckerPage.tsx">
                          <div className="flex justify-between items-center" data-id="gor3yoafg" data-path="src/pages/ATSCheckerPage.tsx">
                            <Label>Overall ATS Score</Label>
                            <span className={`font-bold text-lg ${getScoreColor(scoreResult.overallScore)}`} data-id="jnsltwd13" data-path="src/pages/ATSCheckerPage.tsx">
                              {scoreResult.overallScore}%
                            </span>
                          </div>
                          <Progress value={scoreResult.overallScore} className="h-3" />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6" data-id="5v7ni28gj" data-path="src/pages/ATSCheckerPage.tsx">
                          <div className="space-y-3" data-id="9quzn6hcw" data-path="src/pages/ATSCheckerPage.tsx">
                            <div className="flex justify-between items-center" data-id="hjqog2rfp" data-path="src/pages/ATSCheckerPage.tsx">
                              <Label>Keyword Match</Label>
                              <span className={`font-bold ${getScoreColor(scoreResult.keywordMatch.score)}`} data-id="9bbwgirp8" data-path="src/pages/ATSCheckerPage.tsx">
                                {scoreResult.keywordMatch.score}%
                              </span>
                            </div>
                            <Progress value={scoreResult.keywordMatch.score} className="h-2" />
                          </div>
                          
                          <div className="space-y-3" data-id="dk4cf4u0u" data-path="src/pages/ATSCheckerPage.tsx">
                            <div className="flex justify-between items-center" data-id="7d5rc3249" data-path="src/pages/ATSCheckerPage.tsx">
                              <Label>Format & Structure</Label>
                              <span className={`font-bold ${getScoreColor(scoreResult.formatScore)}`} data-id="p0jzch2lb" data-path="src/pages/ATSCheckerPage.tsx">
                                {scoreResult.formatScore}%
                              </span>
                            </div>
                            <Progress value={scoreResult.formatScore} className="h-2" />
                          </div>
                          
                          <div className="space-y-3" data-id="viyc9uvbm" data-path="src/pages/ATSCheckerPage.tsx">
                            <div className="flex justify-between items-center" data-id="uzyh4yij3" data-path="src/pages/ATSCheckerPage.tsx">
                              <Label>Content Quality</Label>
                              <span className={`font-bold ${getScoreColor(scoreResult.contentScore)}`} data-id="uqpzpglh2" data-path="src/pages/ATSCheckerPage.tsx">
                                {scoreResult.contentScore}%
                              </span>
                            </div>
                            <Progress value={scoreResult.contentScore} className="h-2" />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4" data-id="5wimh9a8x" data-path="src/pages/ATSCheckerPage.tsx">
                          <h3 className="font-semibold" data-id="q15obt9un" data-path="src/pages/ATSCheckerPage.tsx">Keyword Analysis</h3>
                          
                          <div className="space-y-3" data-id="7s85qv7vo" data-path="src/pages/ATSCheckerPage.tsx">
                            <Label className="text-sm text-gray-600">Keywords Found</Label>
                            <div className="flex flex-wrap gap-2" data-id="cp8wc4kzl" data-path="src/pages/ATSCheckerPage.tsx">
                              {scoreResult.keywordMatch.matches.map((keyword, index) =>
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="mr-1 h-3 w-3" /> {keyword}
                                </Badge>
                            )}
                            </div>
                          </div>
                          
                          {scoreResult.keywordMatch.missing.length > 0 &&
                        <div className="space-y-3" data-id="trgmj9k3q" data-path="src/pages/ATSCheckerPage.tsx">
                              <Label className="text-sm text-gray-600">Missing Keywords</Label>
                              <div className="flex flex-wrap gap-2" data-id="ubpnnsubk" data-path="src/pages/ATSCheckerPage.tsx">
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
                  
                  <div data-id="93sx7odqr" data-path="src/pages/ATSCheckerPage.tsx">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2" data-id="0fzxatery" data-path="src/pages/ATSCheckerPage.tsx">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          <CardTitle>Recommendations</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {scoreResult.recommendations.length > 0 ?
                      scoreResult.recommendations.map((recommendation, index) =>
                      <Alert key={index} className="text-sm">
                              <AlertDescription>{recommendation}</AlertDescription>
                            </Alert>
                      ) :

                      <Alert className="bg-green-50 text-green-700 border-green-200">
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