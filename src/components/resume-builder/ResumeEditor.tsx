import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ResumeEditorProps {
  resumeData: ResumeData;
  onUpdate: (data: Partial<ResumeData>) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, onUpdate }) => {
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
    <div className="space-y-6" data-id="f4kodviw1" data-path="src/components/resume-builder/ResumeEditor.tsx">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4" data-id="dfw1dji58" data-path="src/components/resume-builder/ResumeEditor.tsx">Personal Information</h3>
          <div className="space-y-4" data-id="psp70cibr" data-path="src/components/resume-builder/ResumeEditor.tsx">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="tasn9ovv9" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <div className="space-y-2" data-id="v1zaqb042" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      name: e.target.value
                    }
                  })} />

              </div>
              <div className="space-y-2" data-id="of17mu6b0" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      title: e.target.value
                    }
                  })} />

              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="gta85zm93" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <div className="space-y-2" data-id="1531thcds" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      email: e.target.value
                    }
                  })} />

              </div>
              <div className="space-y-2" data-id="nkywxk4fh" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => onUpdate({
                    personalInfo: {
                      ...resumeData.personalInfo,
                      phone: e.target.value
                    }
                  })} />

              </div>
            </div>
            
            <div className="space-y-2" data-id="yeos3hr1d" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={resumeData.personalInfo.address || ""}
                onChange={(e) => onUpdate({
                  personalInfo: {
                    ...resumeData.personalInfo,
                    address: e.target.value
                  }
                })} />

            </div>
            
            <div className="space-y-2" data-id="8qohv20yz" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.personalInfo.summary}
                onChange={(e) => onUpdate({
                  personalInfo: {
                    ...resumeData.personalInfo,
                    summary: e.target.value
                  }
                })}
                className="min-h-[100px]" />

            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4" data-id="9f2bxdo7d" data-path="src/components/resume-builder/ResumeEditor.tsx">
            <h3 className="text-xl font-semibold" data-id="f1m9il971" data-path="src/components/resume-builder/ResumeEditor.tsx">Experience</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addExperience}
              className="flex items-center gap-1">

              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          
          {resumeData.experience.map((exp, index) =>
          <div key={exp.id} className="mb-6" data-id="ujzp2scns" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <div className="flex justify-between items-start mb-3" data-id="f42qv00l1" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <h4 className="font-medium" data-id="8ootza40h" data-path="src/components/resume-builder/ResumeEditor.tsx">Experience {index + 1}</h4>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="h-8 w-8 p-0 text-red-500">

                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3" data-id="q2mwthad3" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <div className="space-y-2" data-id="3l9ho5qhe" data-path="src/components/resume-builder/ResumeEditor.tsx">
                  <Label>Company</Label>
                  <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)} />

                </div>
                <div className="space-y-2" data-id="86alp6mrn" data-path="src/components/resume-builder/ResumeEditor.tsx">
                  <Label>Position</Label>
                  <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)} />

                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3" data-id="u1rc13hku" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <div className="space-y-2" data-id="eu8ht94hv" data-path="src/components/resume-builder/ResumeEditor.tsx">
                  <Label>Start Date</Label>
                  <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, "startDate", e.target.value)} />

                </div>
                <div className="space-y-2" data-id="1boemtgdl" data-path="src/components/resume-builder/ResumeEditor.tsx">
                  <Label>End Date</Label>
                  <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, "endDate", e.target.value)} />

                </div>
              </div>
              
              <div className="space-y-2" data-id="erixr3wza" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <Label>Description</Label>
                <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, "description", e.target.value)}
                className="min-h-[80px]" />

              </div>
              
              {index < resumeData.experience.length - 1 &&
            <Separator className="my-6" />
            }
            </div>
          )}
          
          {resumeData.experience.length === 0 &&
          <div className="text-center py-4 text-gray-500" data-id="o2sg64mn3" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <p data-id="oavb3wte4" data-path="src/components/resume-builder/ResumeEditor.tsx">No experience added yet. Click "Add" to add your work experience.</p>
            </div>
          }
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4" data-id="a2u7tmeez" data-path="src/components/resume-builder/ResumeEditor.tsx">
            <h3 className="text-xl font-semibold" data-id="2ol7s4r5a" data-path="src/components/resume-builder/ResumeEditor.tsx">Education</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addEducation}
              className="flex items-center gap-1">

              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
          
          {resumeData.education.map((edu, index) =>
          <div key={edu.id} className="mb-6" data-id="r5wec9wwu" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <div className="flex justify-between items-start mb-3" data-id="5x3lhkj0i" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <h4 className="font-medium" data-id="falgbsyz9" data-path="src/components/resume-builder/ResumeEditor.tsx">Education {index + 1}</h4>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
                className="h-8 w-8 p-0 text-red-500">

                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3" data-id="58exw10xj" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <div className="space-y-2" data-id="65v8zjszp" data-path="src/components/resume-builder/ResumeEditor.tsx">
                  <Label>School/University</Label>
                  <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(index, "school", e.target.value)} />

                </div>
                <div className="space-y-2" data-id="vq9pvihm7" data-path="src/components/resume-builder/ResumeEditor.tsx">
                  <Label>Degree</Label>
                  <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)} />

                </div>
              </div>
              
              <div className="space-y-2" data-id="6yvybr0io" data-path="src/components/resume-builder/ResumeEditor.tsx">
                <Label>Date</Label>
                <Input
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
          <div className="text-center py-4 text-gray-500" data-id="pzgoobfh3" data-path="src/components/resume-builder/ResumeEditor.tsx">
              <p data-id="h5g5bvuly" data-path="src/components/resume-builder/ResumeEditor.tsx">No education added yet. Click "Add" to add your education.</p>
            </div>
          }
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4" data-id="chfkva4za" data-path="src/components/resume-builder/ResumeEditor.tsx">Skills</h3>
          <div className="space-y-2" data-id="2grqlh0bv" data-path="src/components/resume-builder/ResumeEditor.tsx">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Textarea
              id="skills"
              value={resumeData.skills.join(", ")}
              onChange={(e) => {
                const skills = e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean);
                onUpdate({ skills });
              }}
              className="min-h-[100px]"
              placeholder="e.g., JavaScript, React, Node.js, Project Management" />

          </div>
        </CardContent>
      </Card>
    </div>);

};

export default ResumeEditor;