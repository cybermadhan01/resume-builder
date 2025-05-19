import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData } from "@/types/resume";
import ImageUploader from "./ImageUploader";
import { useToast } from "@/hooks/use-toast";

interface ResumeEditorProps {
  resumeData: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, onUpdate }) => {
  const { toast } = useToast();
  const [showImageUploader, setShowImageUploader] = useState(false);
  
  // Check if template supports image upload (this would normally be passed from the parent)
  useEffect(() => {
    // For demonstration purposes, we'll assume the first 15 templates support image upload
    setShowImageUploader(true);
  }, []);
  
  const handleImageUpload = (imageData: string) => {
    onUpdate({
      personalInfo: {
        ...resumeData.personalInfo,
        profileImage: imageData
      }
    });
    
    if (imageData) {
      toast({
        title: "Image Updated",
        description: "Your profile image has been updated in your resume"
      });
    }
  };
  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    };

    onUpdate({
      experience: [...resumeData.experience, newExperience]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };

    onUpdate({ experience: updatedExperience });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);

    onUpdate({ experience: updatedExperience });
  };

  const addEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      date: ""
    };

    onUpdate({
      education: [...resumeData.education, newEducation]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };

    onUpdate({ education: updatedEducation });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);

    onUpdate({ education: updatedEducation });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Personal Information</h3>
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      name: e.target.value
                    }
                  })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      title: e.target.value
                    }
                  })} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      email: e.target.value
                    }
                  })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      phone: e.target.value
                    }
                  })} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                value={resumeData.personalInfo.address || ""}
                onChange={(e) => onUpdate({
                  personalInfo: {
                    ...resumeData.personalInfo,
                    address: e.target.value
                  }
                })} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                className="min-h-[100px] hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                value={resumeData.personalInfo.summary}
                onChange={(e) => onUpdate({
                  personalInfo: {
                    ...resumeData.personalInfo,
                    summary: e.target.value
                  }
                })} />
            </div>
            
            {showImageUploader && (
              <div className="space-y-2">
                <ImageUploader 
                  onImageUpload={handleImageUpload}
                  currentImage={resumeData.personalInfo.profileImage}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Experience</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addExperience}
              className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          
          {resumeData.experience.map((exp, index) =>
          <div key={exp.id} className="mb-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 transition-colors duration-200">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                className="min-h-[80px] hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                value={exp.description}
                onChange={(e) => updateExperience(index, "description", e.target.value)} />
              </div>
              
              {index < resumeData.experience.length - 1 &&
            <Separator className="my-6" />
            }
            </div>
          )}
          
          {resumeData.experience.length === 0 &&
          <div className="text-center py-4 text-gray-500 animate-in fade-in duration-300">
              <p>No experience added yet. Click "Add" to add your work experience.</p>
            </div>
          }
        </CardContent>
      </Card>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Education</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addEducation}
              className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          
          {resumeData.education.map((edu, index) =>
          <div key={edu.id} className="mb-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 transition-colors duration-200">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <Label>School/University</Label>
                  <Input
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, "school", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                  className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                value={edu.date}
                onChange={(e) => updateEducation(index, "date", e.target.value)}
                placeholder="e.g., 2015 - 2019" />
              </div>
              
              {index < resumeData.education.length - 1 &&
            <Separator className="my-6" />
            }
            </div>
          )}
          
          {resumeData.education.length === 0 &&
          <div className="text-center py-4 text-gray-500 animate-in fade-in duration-300">
              <p>No education added yet. Click "Add" to add your education.</p>
            </div>
          }
        </CardContent>
      </Card>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills</h3>
          <div className="space-y-2 animate-in fade-in duration-300">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Textarea
              id="skills"
              className="min-h-[100px] hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
              value={resumeData.skills.join(", ")}
              onChange={(e) => {
                const skills = e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean);
                onUpdate({ skills });
              }}
              placeholder="e.g., JavaScript, React, Node.js, Project Management" />
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default ResumeEditor;