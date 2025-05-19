import { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResumeEditor from "@/components/resume-builder/ResumeEditor";
import { ResumeData } from "@/types/resume";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
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
  }],

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
  }],

  skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "Express", "REST APIs", "Git", "Agile Methodologies"]
};

const TEMPLATES = [
{ id: "basic", name: "Basic", component: BasicTemplate },
{ id: "modern", name: "Modern", component: ModernTemplate },
{ id: "professional", name: "Professional", component: ProfessionalTemplate }];


const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [section, setSection] = useState("templates");
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<{[key: string]: boolean;}>({
    templateSelected: false,
    contentEdited: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setProgress((prev) => ({
      ...prev,
      templateSelected: true
    }));
  };

  const handleResumeDataUpdate = (data: Partial<ResumeData>) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...data
    }));
    // Mark content as edited when changes are made
    setProgress((prev) => ({
      ...prev,
      contentEdited: true
    }));
  };

  const handleExport = async (format = 'pdf') => {
    // Prevent multiple concurrent download attempts
    if (isDownloading) return;

    setIsDownloading(true);
    if (!resumeRef.current) {
      toast({
        title: "Error",
        description: "Unable to generate resume. Please try again.",
        variant: "destructive"
      });
      return;
    }

    const element = resumeRef.current;
    const filename = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume`;

    const options = {
      margin: 0.5,
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    toast({
      title: "Preparing Download",
      description: "Your resume is being prepared for download..."
    });

    try {
      if (format === 'pdf') {
        html2pdf().set(options).from(element).save().then(() => {
          setIsDownloading(false);
          toast({
            title: "Resume Downloaded",
            description: "Your resume has been successfully downloaded as a PDF."
          });
        });
      } else if (format === 'png') {
        html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          setIsDownloading(false);

          toast({
            title: "Resume Downloaded",
            description: "Your resume has been successfully downloaded as a PNG."
          });
        });
      }
    } catch (error) {
      setIsDownloading(false);
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "An error occurred while downloading your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCheckATS = () => {
    navigate("/ats-checker");
  };

  const handleSectionChange = (value: string) => {
    setSection(value);

    // Scroll to the appropriate section
    setTimeout(() => {
      // First scroll to top to ensure consistent scrolling behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Then scroll to the specific section
      setTimeout(() => {
        switch (value) {
          case "templates":
            templatesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          case "editor":
            editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          case "preview":
            previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
      }, 100);
    }, 100);
  };

  const SelectedTemplateComponent = TEMPLATES.find((t) => t.id === selectedTemplate)?.component || BasicTemplate;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Tabs
        value={section}
        onValueChange={handleSectionChange}
        className="w-full transition-all duration-300 ease-in-out">

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Builder</h1>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
              <div className={`flex items-center ${section === 'templates' ? 'text-primary font-medium' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${section === 'templates' || progress.templateSelected ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-200'}`}>1</span>
                <span>Choose Template</span>
              </div>
              <div className="w-8 h-[2px] bg-gray-200"></div>
              <div className={`flex items-center ${section === 'editor' ? 'text-primary font-medium' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${section === 'editor' || progress.contentEdited ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-200'}`}>2</span>
                <span>Edit Content</span>
              </div>
              <div className="w-8 h-[2px] bg-gray-200"></div>
              <div className={`flex items-center ${section === 'preview' ? 'text-primary font-medium' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${section === 'preview' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-200'}`}>3</span>
                <span>Preview & Export</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="templates"
                className={section === "templates" ?
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}>
                Templates
              </TabsTrigger>
              <TabsTrigger
                value="editor"
                className={section === "editor" ?
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}>
                Content Editor
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className={section === "preview" ?
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}>
                Preview & Export
              </TabsTrigger>
            </TabsList>

            <TabsContent ref={templatesRef} value="templates" className="space-y-6 transition-all duration-300 ease-in-out animate-in fade-in">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Choose a Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {TEMPLATES.map((template) =>
                <Card
                  key={template.id}
                  className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                  selectedTemplate === template.id ?
                  "ring-2 ring-primary scale-105 shadow-xl" :
                  "hover:scale-[1.02] shadow-md"}`
                  }
                  onClick={() => handleTemplateSelect(template.id)}>

                    <CardContent className="p-4">
                      <div className="aspect-[8.5/11] bg-white border rounded-md overflow-hidden shadow-sm">
                        <template.component resumeData={resumeData} preview={true} />
                      </div>
                      <h3 className="mt-3 text-center font-medium">{template.name}</h3>
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => {
                    // Show user feedback before switching tabs
                    toast({
                      title: "Loading Editor",
                      description: "Opening the resume content editor..."
                    });
                    // Switch to editor tab
                    handleSectionChange("editor");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={!progress.templateSelected}>
                  {!progress.templateSelected ? "Select a template first" : "Continue to Editor"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent ref={editorRef} value="editor" className="space-y-6 transition-all duration-300 ease-in-out animate-in fade-in">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Edit Your Resume</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <ResumeEditor
                    resumeData={resumeData}
                    onUpdate={handleResumeDataUpdate} />

                </div>

                <div>
                  <Card className="sticky top-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Preview</h3>
                      <div className="aspect-[8.5/11] bg-white border rounded-md overflow-hidden scale-90 origin-top shadow-sm">
                        <SelectedTemplateComponent resumeData={resumeData} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline"
                onClick={() => handleSectionChange("templates")}
                className="hover:bg-gray-100 transition-all duration-300">
                  Back to Templates
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Loading Preview",
                      description: "Preparing your resume preview..."
                    });
                    handleSectionChange("preview");
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={!progress.contentEdited}>
                  {!progress.contentEdited ? "Edit content first" : "Continue to Preview"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent ref={previewRef} value="preview" className="space-y-6 transition-all duration-300 ease-in-out animate-in fade-in">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Preview & Export</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <CardContent className="p-4">
                      <div className="bg-white border rounded-md overflow-hidden mx-auto max-w-[800px] shadow-sm" ref={resumeRef}>
                        <SelectedTemplateComponent resumeData={resumeData} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Export Options</h3>
                        <div className="space-y-3">
                          <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
                            onClick={() => handleExport('pdf')}
                            disabled={isDownloading}>
                            {isDownloading ? 'Preparing Download...' : 'Download as PDF'}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full hover:bg-gray-100 transition-all duration-300"
                            onClick={() => handleExport('png')}
                            disabled={isDownloading}>
                            {isDownloading ? 'Preparing Download...' : 'Download as PNG'}
                          </Button>
                        </div>
                      </div>
                      
                      <hr className="my-4" />
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">ATS Score</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Use our ATS Score Checker to see how your resume performs against Applicant Tracking Systems.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
                          onClick={handleCheckATS}>
                          Check ATS Score
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => handleSectionChange("editor")}
                  className="hover:bg-gray-100 transition-all duration-300">
                  Back to Editor
                </Button>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>);

};

export default ResumePage;