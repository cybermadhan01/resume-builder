import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResumeEditor from "@/components/resume-builder/ResumeEditor";
import { ResumeData } from "@/types/resume";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Resume templates imports
import BasicTemplate from "@/components/resume-templates/BasicTemplate";
import ModernTemplate from "@/components/resume-templates/ModernTemplate";
import ProfessionalTemplate from "@/components/resume-templates/ProfessionalTemplate";

const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    title: "Software Engineer",
    summary: "Experienced software engineer with a passion for creating innovative solutions."
  },
  experience: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "Led development of cloud-based applications using React and Node.js. Improved system performance by 40%."
    },
    {
      id: "exp2",
      company: "Digital Innovations",
      position: "Software Developer",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      description: "Developed and maintained web applications. Collaborated with UX designers to implement user-friendly interfaces."
    }
  ],
  education: [
    {
      id: "edu1",
      school: "University of Technology",
      degree: "Master of Computer Science",
      date: "2015 - 2017"
    },
    {
      id: "edu2",
      school: "State University",
      degree: "Bachelor of Science in Software Engineering",
      date: "2011 - 2015"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "Express", "REST APIs", "Git", "Agile Methodologies"]
};

const TEMPLATES = [
  { id: "basic", name: "Basic", component: BasicTemplate },
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "professional", name: "Professional", component: ProfessionalTemplate }
];

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [section, setSection] = useState("templates");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleResumeDataUpdate = (data: Partial<ResumeData>) => {
    setResumeData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const handleExport = () => {
    // This would be where PDF export logic would go
    // For now, we'll just show a toast notification
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been successfully downloaded as a PDF.",
    });
  };

  const handleCheckATS = () => {
    navigate("/ats-checker");
  };

  const SelectedTemplateComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component || BasicTemplate;

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs defaultValue={section} onValueChange={setSection} className="w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="editor">Content Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview & Export</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <h2 className="text-2xl font-bold">Choose a Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TEMPLATES.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer hover:shadow-lg transition-shadow ${
                      selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-[8.5/11] bg-white border rounded-md overflow-hidden">
                        <template.component resumeData={resumeData} preview={true} />
                      </div>
                      <h3 className="mt-3 text-center font-medium">{template.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setSection("editor")}>Continue to Editor</Button>
              </div>
            </TabsContent>

            <TabsContent value="editor" className="space-y-6">
              <h2 className="text-2xl font-bold">Edit Your Resume</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <ResumeEditor 
                    resumeData={resumeData} 
                    onUpdate={handleResumeDataUpdate}
                  />
                </div>

                <div>
                  <Card className="sticky top-6">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Preview</h3>
                      <div className="aspect-[8.5/11] bg-white border rounded-md overflow-hidden scale-90 origin-top">
                        <SelectedTemplateComponent resumeData={resumeData} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setSection("templates")}>Back to Templates</Button>
                <Button onClick={() => setSection("preview")}>Continue to Preview</Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <h2 className="text-2xl font-bold">Preview & Export</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="bg-white border rounded-md overflow-hidden mx-auto max-w-[800px]">
                        <SelectedTemplateComponent resumeData={resumeData} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Export Options</h3>
                        <div className="space-y-3">
                          <Button className="w-full" onClick={handleExport}>Download as PDF</Button>
                          <Button variant="outline" className="w-full" onClick={handleExport}>Download as PNG</Button>
                        </div>
                      </div>
                      
                      <hr className="my-4" />
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3">ATS Score</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Use our ATS Score Checker to see how your resume performs against Applicant Tracking Systems.
                        </p>
                        <Button variant="outline" className="w-full" onClick={handleCheckATS}>Check ATS Score</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setSection("editor")}>Back to Editor</Button>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ResumePage;