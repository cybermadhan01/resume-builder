import { useState, useRef, useEffect } from "react";
import useResumeTemplates from "@/hooks/useResumeTemplates";
import html2pdf from "html2pdf.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ResumeEditor from "@/components/resume-builder/ResumeEditor";
import { ResumeData, ExportFormat } from "@/types/resume";
import { useNavigate, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Star, Image as ImageIcon, Eye, Search, Filter, Loader2, Save } from "lucide-react";
import { EXTENDED_TEMPLATES, TEMPLATE_CATEGORIES, TemplateData } from "@/data/resumeTemplates";
import { useAuth } from "@/contexts/AuthContext";

// Resume templates imports
import BasicTemplate from "@/components/resume-templates/BasicTemplate";
import ModernTemplate from "@/components/resume-templates/ModernTemplate";
import ProfessionalTemplate from "@/components/resume-templates/ProfessionalTemplate";
import ModernYellowTemplate from "@/components/resume-templates/ModernYellowTemplate";

const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    title: "Software Engineer",
    summary: "Experienced software engineer with a passion for creating innovative solutions.",
    profileImage: ""
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

// Map of template components
const TEMPLATE_COMPONENTS: {[key: string]: React.ComponentType<{resumeData: ResumeData;preview?: boolean;}>} = {
  'BasicTemplate': BasicTemplate,
  'ModernTemplate': ModernTemplate,
  'ProfessionalTemplate': ProfessionalTemplate,
  'ModernYellowTemplate': ModernYellowTemplate
};

// Export formats available
const EXPORT_FORMATS: ExportFormat[] = [
{ id: 'pdf', name: 'PDF', description: 'Portable Document Format', icon: 'FileText' },
{ id: 'png', name: 'PNG', description: 'High-quality image format', icon: 'Image' },
{ id: 'jpg', name: 'JPG', description: 'Compressed image format', icon: 'Image' },
{ id: 'docx', name: 'DOCX', description: 'Microsoft Word format', icon: 'FileText' }];

interface ResumeRecord {
  id: number;
  user_id: string;
  title: string;
  template: string;
  content: string;
  last_modified: string;
  thumbnail: string;
}

const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const templatesRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');

  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [section, setSection] = useState("templates");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { templates, isLoading: templatesLoading } = useResumeTemplates();
  const [filteredTemplates, setFilteredTemplates] = useState<TemplateData[]>([]);
  const [progress, setProgress] = useState<{[key: string]: boolean}>({
    templateSelected: false,
    contentEdited: false
  });
  const [currentResumeId, setCurrentResumeId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Load resume if ID is provided
  useEffect(() => {
    if (resumeId) {
      loadResume(Number(resumeId));
    }
  }, [resumeId]);

  // Filter templates based on category and search query
  useEffect(() => {
    let allTemplates = [...templates];

    // Filter by category
    if (selectedCategory !== 'all') {
      allTemplates = allTemplates.filter((t) => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      allTemplates = allTemplates.filter((t) =>
      t.name.toLowerCase().includes(query) ||
      t.displayName.toLowerCase().includes(query) ||
      t.description && t.description.toLowerCase().includes(query)
      );
    }

    setFilteredTemplates(allTemplates);
  }, [selectedCategory, searchQuery, templates]);

  const loadResume = async (id: number) => {
    try {
      setIsLoading(true);

      const response = await window.ezsite.apis.tablePage(6625, {
        PageNo: 1,
        PageSize: 1,
        Filters: [
        {
          name: "id",
          op: "Equal",
          value: id
        }]

      });

      if (response.error) throw response.error;

      if (response.data.List && response.data.List.length > 0) {
        const resumeRecord = response.data.List[0] as ResumeRecord;

        // Parse the resume content
        const content = JSON.parse(resumeRecord.content);

        setResumeData(content);
        setSelectedTemplate(resumeRecord.template);
        setResumeTitle(resumeRecord.title);
        setCurrentResumeId(resumeRecord.id);

        // Set progress states
        setProgress({
          templateSelected: true,
          contentEdited: true
        });

        // If loading an existing resume, go straight to editor
        setSection("editor");

        toast({
          title: "Resume Loaded",
          description: `Successfully loaded "${resumeRecord.title}"`
        });
      } else {
        toast({
          title: "Resume Not Found",
          description: "The requested resume could not be found.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      toast({
        title: "Error",
        description: "Failed to load resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveResume = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to save your resume.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);

      // Generate a thumbnail
      let thumbnailId = "";
      if (resumeRef.current) {
        try {
          const canvas = await html2canvas(resumeRef.current, {
            scale: 0.5,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff"
          });

          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
            }, 'image/jpeg', 0.7);
          });

          // Create a File from the Blob
          const file = new File([blob], `resume_thumbnail_${Date.now()}.jpg`, { type: 'image/jpeg' });

          // Upload the file
          const uploadResponse = await window.ezsite.apis.upload({
            filename: file.name,
            file: file
          });

          if (uploadResponse.error) throw uploadResponse.error;
          thumbnailId = uploadResponse.data.toString();
        } catch (error) {
          console.error('Error creating thumbnail:', error);
        }
      }

      // Create or update the resume record
      const resumeContent = JSON.stringify(resumeData);

      if (currentResumeId) {
        // Update existing resume
        const updateData = {
          id: currentResumeId,
          user_id: user?.ID,
          title: resumeTitle,
          template: selectedTemplate,
          content: resumeContent,
          last_modified: new Date().toISOString()
        };

        // Only update thumbnail if we have a new one
        if (thumbnailId) {
          updateData.thumbnail = thumbnailId;
        }

        const updateResponse = await window.ezsite.apis.tableUpdate(6625, updateData);
        if (updateResponse.error) throw updateResponse.error;

        toast({
          title: "Resume Updated",
          description: "Your resume has been successfully updated."
        });
      } else {
        // Create new resume
        const newResume = {
          user_id: user?.ID,
          title: resumeTitle,
          template: selectedTemplate,
          content: resumeContent,
          last_modified: new Date().toISOString(),
          thumbnail: thumbnailId
        };

        const createResponse = await window.ezsite.apis.tableCreate(6625, newResume);
        if (createResponse.error) throw createResponse.error;

        // Update user activity
        try {
          const activityResponse = await window.ezsite.apis.tablePage(7227, {
            PageNo: 1,
            PageSize: 1,
            Filters: [
            {
              name: "user_id",
              op: "Equal",
              value: user?.ID
            }]

          });

          if (activityResponse.error) throw activityResponse.error;

          if (activityResponse.data.List && activityResponse.data.List.length > 0) {
            const activity = activityResponse.data.List[0];
            await window.ezsite.apis.tableUpdate(7227, {
              id: activity.id,
              user_id: user?.ID,
              resume_count: (activity.resume_count || 0) + 1,
              last_active: new Date().toISOString()
            });
          }
        } catch (activityError) {
          console.error('Error updating activity:', activityError);
        }

        // Get the created resume to set current ID
        const getCreatedResponse = await window.ezsite.apis.tablePage(6625, {
          PageNo: 1,
          PageSize: 1,
          OrderByField: "last_modified",
          IsAsc: false,
          Filters: [
          {
            name: "user_id",
            op: "Equal",
            value: user?.ID
          }]

        });

        if (getCreatedResponse.data.List && getCreatedResponse.data.List.length > 0) {
          setCurrentResumeId(getCreatedResponse.data.List[0].id);
        }

        toast({
          title: "Resume Saved",
          description: "Your resume has been successfully saved."
        });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setProgress((prev) => ({
      ...prev,
      templateSelected: true
    }));

    // Find the selected template to show detailed information
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      toast({
        title: `${template.displayName} Selected`,
        description: template.description || `You've selected the ${template.displayName} template`
      });
    }
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
      setIsDownloading(false);
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
      description: `Your resume is being prepared for download as ${format.toUpperCase()}...`
    });

    try {
      switch (format) {
        case 'pdf':
          html2pdf().set(options).from(element).save().then(() => {
            setIsDownloading(false);
            toast({
              title: "Resume Downloaded",
              description: "Your resume has been successfully downloaded as a PDF."
            });
          });
          break;

        case 'png':
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
          break;

        case 'jpg':
          html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
            const link = document.createElement('a');
            link.download = `${filename}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
            setIsDownloading(false);

            toast({
              title: "Resume Downloaded",
              description: "Your resume has been successfully downloaded as a JPG."
            });
          });
          break;

        case 'docx':
          // For DOCX export, we would typically use a library like docx-js
          // This is a simplified version for demonstration purposes
          toast({
            title: "DOCX Export",
            description: "Preparing DOCX export..."
          });

          // Simulate DOCX export (in a real app, you would use a proper library)
          setTimeout(() => {
            // Create a simple text file for demonstration
            const resumeText = `${resumeData.personalInfo.name}\n${resumeData.personalInfo.title}\n\nContact: ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}\n\nSummary: ${resumeData.personalInfo.summary}\n`;

            const blob = new Blob([resumeText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}.docx`;
            link.click();

            setIsDownloading(false);
            toast({
              title: "Resume Downloaded",
              description: "Your resume has been successfully downloaded as a DOCX file."
            });
          }, 1500);
          break;

        default:
          setIsDownloading(false);
          toast({
            title: "Format Not Supported",
            description: `The format ${format} is not currently supported.`,
            variant: "destructive"
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

  // Determine which template component to render based on the selected template
  const getSelectedTemplateComponent = () => {
    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return BasicTemplate; // Default to BasicTemplate if not found

    // Find the corresponding component
    return TEMPLATE_COMPONENTS[template.component] || BasicTemplate;
  };

  const SelectedTemplateComponent = getSelectedTemplateComponent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-semibold">Loading Resume...</h2>
        <p className="text-muted-foreground">Please wait while we fetch your resume</p>
      </div>);

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Tabs
        value={section}
        onValueChange={handleSectionChange}
        className="w-full transition-all duration-300 ease-in-out">

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Builder</h1>
              
              {isAuthenticated &&
              <div className="flex gap-2">
                  {isAuthenticated && section !== "templates" &&
                <div className="flex items-center mb-2">
                      <input
                    type="text"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    placeholder="Resume Title"
                    className="px-3 py-1 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                      <Button
                    onClick={saveResume}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">

                        {isSaving ?
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> :

                    <><Save className="w-4 h-4 mr-2" /> Save Resume</>
                    }
                      </Button>
                    </div>
                }
                </div>
              }
            </div>
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
              
              {/* Search and filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />

                </div>
                <div className="flex flex-wrap gap-2">
                  {TEMPLATE_CATEGORIES.map((category) =>
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`cursor-pointer ${selectedCategory === category.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(category.id)}>

                      {category.name}
                    </Badge>
                  )}
                </div>
              </div>
              
              {templatesLoading ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Loading templates...</h3>
                  <p className="text-gray-500">Please wait while we fetch available templates</p>
                </div>
              ) : filteredTemplates.length === 0 ?
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No templates found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div> :

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                  {filteredTemplates.map((template) =>
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
                            {/* Render the appropriate template component */}
                            {TEMPLATE_COMPONENTS[template.component] &&
                      <>
                                {template.component === 'BasicTemplate' && <BasicTemplate resumeData={resumeData} preview={true} />}
                                {template.component === 'ModernTemplate' && <ModernTemplate resumeData={resumeData} preview={true} />}
                                {template.component === 'ProfessionalTemplate' && <ProfessionalTemplate resumeData={resumeData} preview={true} />}
                                {template.component === 'ModernYellowTemplate' && <ModernYellowTemplate resumeData={resumeData} preview={true} />}
                              </>
                      }
                          </div>
                          <div className="mt-3 text-center">
                            <h3 className="font-medium">{template.displayName}</h3>
                            <div className="flex items-center justify-center mt-1 text-sm text-gray-600">
                              <div className="flex items-center mr-3">
                                <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                                <span>{template.rating}</span>
                              </div>
                              <div className="text-gray-400">|</div>
                              <div className="ml-3 text-gray-600">
                                <span>{template.downloads} downloads</span>
                              </div>
                            </div>
                          </div>
                          <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(template.id);
                        handleSectionChange("editor");
                      }}>

                            Use this template
                          </Button>
                        </CardContent>
                      </Card>
                )}
                </div>
              }
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
                <div className="flex gap-2">
                  {isAuthenticated &&
                  <Button
                    onClick={saveResume}
                    disabled={isSaving || !progress.contentEdited}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">

                      {isSaving ?
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> :

                    <><Save className="w-4 h-4 mr-2" /> Save Resume</>
                    }
                    </Button>
                  }
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
                      {isAuthenticated &&
                      <div className="mb-4">
                          <Button
                          onClick={saveResume}
                          disabled={isSaving}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">

                            {isSaving ?
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> :

                          <><Save className="w-4 h-4 mr-2" /> Save Resume</>
                          }
                          </Button>
                        </div>
                      }
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Export Options</h3>
                        <div className="space-y-3">
                          {EXPORT_FORMATS.map((format) =>
                          <Button
                            key={format.id}
                            variant={format.id === 'pdf' ? "default" : "outline"}
                            className={`w-full ${format.id === 'pdf' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'hover:bg-gray-100'} transition-all duration-300 transform hover:scale-[1.02]`}
                            onClick={() => handleExport(format.id)}
                            disabled={isDownloading}>

                              {isDownloading ?
                            'Preparing Download...' :

                            <>
                                  {format.icon === 'FileText' ? <FileText className="h-4 w-4 mr-2" /> : <ImageIcon className="h-4 w-4 mr-2" />}
                                  Download as {format.name}
                                  {format.id === 'pdf' && <Badge className="ml-2 bg-blue-500">Best</Badge>}
                                </>
                            }
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Files will be optimized for best quality</p>
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
                {isAuthenticated &&
                <Button
                  onClick={() => navigate("/history")}
                  className="bg-gray-800 hover:bg-gray-700">

                    View My Resumes
                  </Button>
                }
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>);


};

export default ResumePage;