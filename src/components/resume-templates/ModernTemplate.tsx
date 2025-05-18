import React from "react";
import { ResumeData } from "@/types/resume";

interface ModernTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData, preview = false }) => {
  const scale = preview ? "scale-[0.4] origin-top-left" : "";

  return (
    <div className={`w-full h-full bg-white text-black ${scale}`} style={{ fontSize: preview ? "16px" : "12px" }} data-id="qedjjdydw" data-path="src/components/resume-templates/ModernTemplate.tsx">
      <div className="bg-blue-600 text-white p-8" data-id="jn6djuug5" data-path="src/components/resume-templates/ModernTemplate.tsx">
        <h1 className="text-3xl font-bold" data-id="je4x14mgv" data-path="src/components/resume-templates/ModernTemplate.tsx">{resumeData.personalInfo.name}</h1>
        <p className="text-xl mt-1" data-id="lj7ev139g" data-path="src/components/resume-templates/ModernTemplate.tsx">{resumeData.personalInfo.title}</p>
        <div className="flex flex-wrap mt-4 text-sm space-x-4" data-id="dlk6pkkvl" data-path="src/components/resume-templates/ModernTemplate.tsx">
          <span data-id="fu9oi442w" data-path="src/components/resume-templates/ModernTemplate.tsx">{resumeData.personalInfo.email}</span>
          <span data-id="wb282lsg6" data-path="src/components/resume-templates/ModernTemplate.tsx">|</span>
          <span data-id="500uos4tv" data-path="src/components/resume-templates/ModernTemplate.tsx">{resumeData.personalInfo.phone}</span>
          {resumeData.personalInfo.address &&
          <>
              <span data-id="4nbtkht1y" data-path="src/components/resume-templates/ModernTemplate.tsx">|</span>
              <span data-id="0av3a3585" data-path="src/components/resume-templates/ModernTemplate.tsx">{resumeData.personalInfo.address}</span>
            </>
          }
        </div>
      </div>

      <div className="p-8" data-id="0g517tdvh" data-path="src/components/resume-templates/ModernTemplate.tsx">
        <div className="mb-6" data-id="h394tt6h1" data-path="src/components/resume-templates/ModernTemplate.tsx">
          <h2 className="text-lg font-bold text-blue-600 mb-2" data-id="kisfhry9c" data-path="src/components/resume-templates/ModernTemplate.tsx">PROFESSIONAL SUMMARY</h2>
          <p data-id="scy3knsss" data-path="src/components/resume-templates/ModernTemplate.tsx">{resumeData.personalInfo.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="4b24icf0m" data-path="src/components/resume-templates/ModernTemplate.tsx">
          <div className="md:col-span-2" data-id="zwsb4tqpy" data-path="src/components/resume-templates/ModernTemplate.tsx">
            <div className="mb-6" data-id="l5qzrj2dm" data-path="src/components/resume-templates/ModernTemplate.tsx">
              <h2 className="text-lg font-bold text-blue-600 mb-3" data-id="wfx3ajj1g" data-path="src/components/resume-templates/ModernTemplate.tsx">EXPERIENCE</h2>
              {resumeData.experience.map((exp) =>
              <div key={exp.id} className="mb-4" data-id="9qpwaql0q" data-path="src/components/resume-templates/ModernTemplate.tsx">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center" data-id="60rprkiw4" data-path="src/components/resume-templates/ModernTemplate.tsx">
                    <h3 className="font-bold text-lg" data-id="krr17ene7" data-path="src/components/resume-templates/ModernTemplate.tsx">{exp.position}</h3>
                    <span className="text-sm text-gray-600" data-id="hll0vpvar" data-path="src/components/resume-templates/ModernTemplate.tsx">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="font-medium text-blue-600" data-id="up3g6vuc4" data-path="src/components/resume-templates/ModernTemplate.tsx">{exp.company}</p>
                  <p className="text-sm mt-2" data-id="x36tush69" data-path="src/components/resume-templates/ModernTemplate.tsx">{exp.description}</p>
                </div>
              )}
            </div>

            <div className="mb-6" data-id="uu3au2wql" data-path="src/components/resume-templates/ModernTemplate.tsx">
              <h2 className="text-lg font-bold text-blue-600 mb-3" data-id="o9xos1si4" data-path="src/components/resume-templates/ModernTemplate.tsx">EDUCATION</h2>
              {resumeData.education.map((edu) =>
              <div key={edu.id} className="mb-3" data-id="6ieaalqwb" data-path="src/components/resume-templates/ModernTemplate.tsx">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center" data-id="qa0o9l6a6" data-path="src/components/resume-templates/ModernTemplate.tsx">
                    <h3 className="font-bold" data-id="7yhsiefdb" data-path="src/components/resume-templates/ModernTemplate.tsx">{edu.school}</h3>
                    <span className="text-sm text-gray-600" data-id="y1onpfbml" data-path="src/components/resume-templates/ModernTemplate.tsx">{edu.date}</span>
                  </div>
                  <p data-id="3o0eq74rl" data-path="src/components/resume-templates/ModernTemplate.tsx">{edu.degree}</p>
                </div>
              )}
            </div>
          </div>

          <div data-id="1ft9b9hik" data-path="src/components/resume-templates/ModernTemplate.tsx">
            <div className="mb-6" data-id="5ay5ygxg5" data-path="src/components/resume-templates/ModernTemplate.tsx">
              <h2 className="text-lg font-bold text-blue-600 mb-3" data-id="fotk2c9zr" data-path="src/components/resume-templates/ModernTemplate.tsx">SKILLS</h2>
              <div className="space-y-2" data-id="p4wpq3mbv" data-path="src/components/resume-templates/ModernTemplate.tsx">
                {resumeData.skills.map((skill, index) =>
                <div key={index} className="bg-gray-100 px-3 py-2 rounded" data-id="9m1ojnvgw" data-path="src/components/resume-templates/ModernTemplate.tsx">
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