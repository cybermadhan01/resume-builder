import React from "react";
import { ResumeData } from "@/types/resume";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ resumeData, preview = false }) => {
  const scale = preview ? "scale-[0.4] origin-top-left" : "";

  return (
    <div className={`w-full h-full bg-white text-black ${scale}`} style={{ fontSize: preview ? "16px" : "12px" }} data-id="weq6g8seu" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
      <div className="p-8" data-id="onvs1xrmr" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6" data-id="g3wjb3o8z" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
          <div data-id="gpvewoo7m" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
            <h1 className="text-3xl font-bold text-gray-800" data-id="iz41troxf" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{resumeData.personalInfo.name}</h1>
            <p className="text-xl text-gray-600 mt-1" data-id="nt1bfa406" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{resumeData.personalInfo.title}</p>
          </div>
          <div className="text-right text-gray-700 text-sm mt-4 md:mt-0" data-id="67jmyrdye" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
            <p data-id="lkbadqlms" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{resumeData.personalInfo.email}</p>
            <p data-id="6t05u0vjc" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{resumeData.personalInfo.phone}</p>
            {resumeData.personalInfo.address && <p data-id="gr5em5cmg" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{resumeData.personalInfo.address}</p>}
          </div>
        </div>

        <div className="border-t-2 border-b-2 border-gray-300 py-4 mb-6" data-id="xoi5a7dvd" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
          <p className="text-gray-700" data-id="zrivhoolh" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{resumeData.personalInfo.summary}</p>
        </div>

        <div className="mb-6" data-id="iovmhcu6e" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative pl-3 before:absolute before:w-1 before:h-full before:bg-gray-800 before:left-0 before:top-0" data-id="oswu5iz2k" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
            Professional Experience
          </h2>
          {resumeData.experience.map((exp) =>
          <div key={exp.id} className="mb-5" data-id="4ikhnbvwd" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline" data-id="hyq9qarho" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
                <h3 className="font-bold text-gray-800" data-id="6zrrwo9km" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{exp.position}</h3>
                <span className="text-sm font-medium text-gray-600 md:text-right" data-id="9246aybi9" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="font-medium text-gray-700 italic" data-id="0hbj096zd" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{exp.company}</p>
              <p className="text-gray-700 mt-2" data-id="7njcgaiqo" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{exp.description}</p>
            </div>
          )}
        </div>

        <div className="mb-6" data-id="g83w28tfj" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative pl-3 before:absolute before:w-1 before:h-full before:bg-gray-800 before:left-0 before:top-0" data-id="igh3u4yun" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
            Education
          </h2>
          {resumeData.education.map((edu) =>
          <div key={edu.id} className="mb-3" data-id="3kbwkeu8j" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline" data-id="vkbrp3adm" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
                <h3 className="font-bold text-gray-800" data-id="8s9kump6c" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{edu.school}</h3>
                <span className="text-sm font-medium text-gray-600 md:text-right" data-id="rg9he8mhb" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{edu.date}</span>
              </div>
              <p className="text-gray-700" data-id="n8iyue38k" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">{edu.degree}</p>
            </div>
          )}
        </div>

        <div data-id="3v7z7a4h3" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
          <h2 className="text-xl font-bold text-gray-800 mb-4 relative pl-3 before:absolute before:w-1 before:h-full before:bg-gray-800 before:left-0 before:top-0" data-id="fahltv40q" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2" data-id="idf2t1ba3" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
            {resumeData.skills.map((skill, index) =>
            <div key={index} className="border border-gray-300 rounded px-3 py-2 text-center" data-id="6qu7x06np" data-path="src/components/resume-templates/ProfessionalTemplate.tsx">
                {skill}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default ProfessionalTemplate;