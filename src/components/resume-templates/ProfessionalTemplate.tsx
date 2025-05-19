import React from "react";
import { ResumeData } from "@/types/resume";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resumeData, preview = false }) => {
  const scale = preview ? "scale-[0.4] origin-top-left" : "";

  return (
    <div className={`w-full h-full bg-white text-black ${scale}`} style={{ fontSize: preview ? "16px" : "12px" }}>
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            {resumeData.personalInfo.profileImage && (
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                <img 
                  src={resumeData.personalInfo.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{resumeData.personalInfo.name}</h1>
              <p className="text-xl text-gray-600 mt-1">{resumeData.personalInfo.title}</p>
            </div>
          </div>
          <div className="text-right text-gray-700 text-sm mt-4 md:mt-0">
            <p>{resumeData.personalInfo.email}</p>
            <p>{resumeData.personalInfo.phone}</p>
            {resumeData.personalInfo.address && <p>{resumeData.personalInfo.address}</p>}
          </div>
        </div>

        <div className="border-t-2 border-b-2 border-gray-300 py-4 mb-6">
          <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative pl-3 before:absolute before:w-1 before:h-full before:bg-gray-800 before:left-0 before:top-0">
            Professional Experience
          </h2>
          {resumeData.experience.map((exp) =>
          <div key={exp.id} className="mb-5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <span className="text-sm font-medium text-gray-600 md:text-right">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="font-medium text-gray-700 italic">{exp.company}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative pl-3 before:absolute before:w-1 before:h-full before:bg-gray-800 before:left-0 before:top-0">
            Education
          </h2>
          {resumeData.education.map((edu) =>
          <div key={edu.id} className="mb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-bold text-gray-800">{edu.school}</h3>
                <span className="text-sm font-medium text-gray-600 md:text-right">{edu.date}</span>
              </div>
              <p className="text-gray-700">{edu.degree}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative pl-3 before:absolute before:w-1 before:h-full before:bg-gray-800 before:left-0 before:top-0">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {resumeData.skills.map((skill, index) =>
            <div key={index} className="border border-gray-300 rounded px-3 py-2 text-center">
                {skill}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default ProfessionalTemplate;