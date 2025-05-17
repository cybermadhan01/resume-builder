import React from "react";
import { ResumeData } from "@/types/resume";

interface BasicTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({ resumeData, preview = false }) => {
  const scale = preview ? "scale-[0.4] origin-top-left" : "";
  
  return (
    <div className={`w-full h-full bg-white text-black p-8 ${scale}`} style={{ fontSize: preview ? "16px" : "12px" }}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase">{resumeData.personalInfo.name}</h1>
        <p className="text-lg mb-2">{resumeData.personalInfo.title}</p>
        <div className="flex justify-center text-sm space-x-4">
          <span>{resumeData.personalInfo.email}</span>
          <span>|</span>
          <span>{resumeData.personalInfo.phone}</span>
          {resumeData.personalInfo.address && (
            <>
              <span>|</span>
              <span>{resumeData.personalInfo.address}</span>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2">Professional Summary</h2>
        <p>{resumeData.personalInfo.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2">Experience</h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start">
              <h3 className="font-bold">{exp.position}</h3>
              <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="font-medium">{exp.company}</p>
            <p className="text-sm mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2">Education</h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-bold">{edu.school}</h3>
              <span className="text-sm">{edu.date}</span>
            </div>
            <p>{edu.degree}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2">Skills</h2>
        <div className="flex flex-wrap">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="mr-2 mb-2 bg-gray-100 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicTemplate;