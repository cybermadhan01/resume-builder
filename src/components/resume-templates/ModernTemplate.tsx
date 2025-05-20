import React from "react";
import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData, preview = false }) => {
  const scale = preview ? "scale-[0.4] origin-top-left" : "";

  return (
    <div className={`w-full h-full bg-white text-black ${scale}`} style={{ fontSize: preview ? "16px" : "12px" }}>
      <div className="bg-blue-600 text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{resumeData.personalInfo.name}</h1>
          <p className="text-xl mt-1">{resumeData.personalInfo.title}</p>
          <div className="flex flex-wrap mt-4 text-sm space-x-4">
            <span>{resumeData.personalInfo.email}</span>
            <span>|</span>
            <span>{resumeData.personalInfo.phone}</span>
            {resumeData.personalInfo.address &&
            <>
                <span>|</span>
                <span>{resumeData.personalInfo.address}</span>
              </>
            }
          </div>
        </div>
        {resumeData.personalInfo.profileImage &&
        <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white">
              <img
              src={resumeData.personalInfo.profileImage}
              alt="Profile"
              className="w-full h-full object-cover" />

            </div>
          </div>
        }
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2">PROFESSIONAL SUMMARY</h2>
          <p>{resumeData.personalInfo.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-600 mb-3">EXPERIENCE</h2>
              {resumeData.experience.map((exp) =>
              <div key={exp.id} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="font-medium text-blue-600">{exp.company}</p>
                  <p className="text-sm mt-2">{exp.description}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-600 mb-3">EDUCATION</h2>
              {resumeData.education.map((edu) =>
              <div key={edu.id} className="mb-3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h3 className="font-bold">{edu.school}</h3>
                    <span className="text-sm text-gray-600">{edu.date}</span>
                  </div>
                  <p>{edu.degree}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-600 mb-3">SKILLS</h2>
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) =>
                <div key={index} className="bg-gray-100 px-3 py-2 rounded">
                    {skill}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ModernTemplate;