import React from "react";
import { ResumeData } from "@/types/resume";

interface BasicTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({ resumeData, preview = false }) => {
  const scale = preview ? "scale-[0.4] origin-top-left" : "";

  return (
    <div className={`w-full h-full bg-white text-black p-8 ${scale}`} style={{ fontSize: preview ? "16px" : "12px" }} data-id="5s9nmjs09" data-path="src/components/resume-templates/BasicTemplate.tsx">
      <div className="text-center mb-6" data-id="b3b6ncwsz" data-path="src/components/resume-templates/BasicTemplate.tsx">
        <h1 className="text-2xl font-bold uppercase" data-id="g717gb36k" data-path="src/components/resume-templates/BasicTemplate.tsx">{resumeData.personalInfo.name}</h1>
        <p className="text-lg mb-2" data-id="f3flf3hy1" data-path="src/components/resume-templates/BasicTemplate.tsx">{resumeData.personalInfo.title}</p>
        <div className="flex justify-center text-sm space-x-4" data-id="wi54tvvod" data-path="src/components/resume-templates/BasicTemplate.tsx">
          <span data-id="x10pwk712" data-path="src/components/resume-templates/BasicTemplate.tsx">{resumeData.personalInfo.email}</span>
          <span data-id="jb1cuylds" data-path="src/components/resume-templates/BasicTemplate.tsx">|</span>
          <span data-id="tc1bs1j1f" data-path="src/components/resume-templates/BasicTemplate.tsx">{resumeData.personalInfo.phone}</span>
          {resumeData.personalInfo.address &&
          <>
              <span data-id="kwx84nlm3" data-path="src/components/resume-templates/BasicTemplate.tsx">|</span>
              <span data-id="kx2my9hgl" data-path="src/components/resume-templates/BasicTemplate.tsx">{resumeData.personalInfo.address}</span>
            </>
          }
        </div>
      </div>

      <div className="mb-6" data-id="4oln2p7vf" data-path="src/components/resume-templates/BasicTemplate.tsx">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2" data-id="xr7ik52tb" data-path="src/components/resume-templates/BasicTemplate.tsx">Professional Summary</h2>
        <p data-id="6q4bwv9k2" data-path="src/components/resume-templates/BasicTemplate.tsx">{resumeData.personalInfo.summary}</p>
      </div>

      <div className="mb-6" data-id="iagar317q" data-path="src/components/resume-templates/BasicTemplate.tsx">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2" data-id="go4y0btrl" data-path="src/components/resume-templates/BasicTemplate.tsx">Experience</h2>
        {resumeData.experience.map((exp) =>
        <div key={exp.id} className="mb-4" data-id="1t8lk02fp" data-path="src/components/resume-templates/BasicTemplate.tsx">
            <div className="flex justify-between items-start" data-id="fio3mzwns" data-path="src/components/resume-templates/BasicTemplate.tsx">
              <h3 className="font-bold" data-id="to1cinrvd" data-path="src/components/resume-templates/BasicTemplate.tsx">{exp.position}</h3>
              <span className="text-sm" data-id="arwkecyxe" data-path="src/components/resume-templates/BasicTemplate.tsx">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="font-medium" data-id="j79m2924k" data-path="src/components/resume-templates/BasicTemplate.tsx">{exp.company}</p>
            <p className="text-sm mt-1" data-id="w6qte9bp1" data-path="src/components/resume-templates/BasicTemplate.tsx">{exp.description}</p>
          </div>
        )}
      </div>

      <div className="mb-6" data-id="n5tzle90t" data-path="src/components/resume-templates/BasicTemplate.tsx">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2" data-id="6w2jwfhjp" data-path="src/components/resume-templates/BasicTemplate.tsx">Education</h2>
        {resumeData.education.map((edu) =>
        <div key={edu.id} className="mb-3" data-id="bohrswfhp" data-path="src/components/resume-templates/BasicTemplate.tsx">
            <div className="flex justify-between" data-id="z4bjm55ke" data-path="src/components/resume-templates/BasicTemplate.tsx">
              <h3 className="font-bold" data-id="uuv3gx988" data-path="src/components/resume-templates/BasicTemplate.tsx">{edu.school}</h3>
              <span className="text-sm" data-id="tjzlunbao" data-path="src/components/resume-templates/BasicTemplate.tsx">{edu.date}</span>
            </div>
            <p data-id="gfs4pzisk" data-path="src/components/resume-templates/BasicTemplate.tsx">{edu.degree}</p>
          </div>
        )}
      </div>

      <div data-id="rysm4vuhl" data-path="src/components/resume-templates/BasicTemplate.tsx">
        <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 mb-2" data-id="5jxokgdnt" data-path="src/components/resume-templates/BasicTemplate.tsx">Skills</h2>
        <div className="flex flex-wrap" data-id="ftzcvetq2" data-path="src/components/resume-templates/BasicTemplate.tsx">
          {resumeData.skills.map((skill, index) =>
          <span key={index} className="mr-2 mb-2 bg-gray-100 px-2 py-1 rounded text-sm" data-id="fvphpncyo" data-path="src/components/resume-templates/BasicTemplate.tsx">
              {skill}
            </span>
          )}
        </div>
      </div>
    </div>);

};

export default BasicTemplate;