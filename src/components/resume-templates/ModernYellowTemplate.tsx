import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernYellowTemplateProps {
  resumeData: ResumeData;
  preview?: boolean;
}

const ModernYellowTemplate: React.FC<ModernYellowTemplateProps> = ({ resumeData, preview = false }) => {
  // Set scaling for preview mode
  const containerClass = preview ?
  'scale-[0.4] origin-top transform' :
  'w-full';

  return (
    <div className={`${containerClass} font-sans`} style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="flex flex-col md:flex-row bg-white border shadow-sm overflow-hidden">
        {/* Left sidebar - dark gray with yellow accent */}
        <div className="w-full md:w-[35%] bg-gray-800 text-white p-6 relative" style={{ minHeight: preview ? '700px' : 'auto' }}>
          {/* Yellow corner accent */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[120px] border-l-[120px] border-yellow-500 border-r-transparent border-b-transparent"></div>
          
          {/* Profile image */}
          <div className="relative z-10 flex justify-center mb-6 mt-[80px]">
            <div className="rounded-full border-4 border-white w-40 h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
              {resumeData.personalInfo.profileImage ?
              <img
                src={resumeData.personalInfo.profileImage}
                alt={resumeData.personalInfo.name}
                className="object-cover w-full h-full" /> :


              <span className="text-gray-400 text-4xl">
                  {resumeData.personalInfo.name.charAt(0)}
                </span>
              }
            </div>
          </div>

          {/* Contact Me Section */}
          <div className="mb-8 relative">
            <div className="flex items-center mb-4">
              <div className="h-5 w-2 bg-yellow-500 mr-3"></div>
              <h2 className="text-xl font-bold">CONTACT ME</h2>
            </div>
            
            <ul className="space-y-3">
              {resumeData.personalInfo.phone &&
              <li className="flex">
                  <div className="mr-3 text-yellow-500">•</div>
                  <div>{resumeData.personalInfo.phone}</div>
                </li>
              }
              
              {resumeData.personalInfo.email &&
              <li className="flex">
                  <div className="mr-3 text-yellow-500">•</div>
                  <div>{resumeData.personalInfo.email}</div>
                </li>
              }
              
              {resumeData.personalInfo.address &&
              <li className="flex">
                  <div className="mr-3 text-yellow-500">•</div>
                  <div>{resumeData.personalInfo.address}</div>
                </li>
              }
            </ul>
          </div>

          {/* References Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-5 w-2 bg-yellow-500 mr-3"></div>
              <h2 className="text-xl font-bold">REFERENCES</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Professional Reference</h4>
                <p className="text-sm">Reference available upon request</p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-5 w-2 bg-yellow-500 mr-3"></div>
              <h2 className="text-xl font-bold">EDUCATION</h2>
            </div>
            
            <div className="space-y-4">
              {resumeData.education.map((edu) =>
              <div key={edu.id}>
                  <h4 className="font-bold">{edu.school}</h4>
                  <p>{edu.degree}</p>
                  <p className="text-yellow-400">{edu.date}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right content area */}
        <div className="w-full md:w-[65%] p-6 bg-white">
          {/* Header with name and title */}
          <div className="mb-8 border-b pb-6">
            <h1 className="text-4xl font-bold mb-1">
              <span className="text-gray-800">
                {resumeData.personalInfo.name.split(' ').slice(0, -1).join(' ')}
              </span>
              {' '}
              <span className="text-yellow-500">
                {resumeData.personalInfo.name.split(' ').pop()}
              </span>
            </h1>
            <h2 className="text-lg uppercase tracking-wider text-gray-500">
              {resumeData.personalInfo.title}
            </h2>
          </div>

          {/* About Me Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-3">•</div>
              <h2 className="text-xl font-bold">ABOUT ME</h2>
            </div>
            <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
          </div>

          {/* Job Experience Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-3">•</div>
              <h2 className="text-xl font-bold">JOB EXPERIENCE</h2>
            </div>
            
            <div className="space-y-6">
              {resumeData.experience.map((exp) =>
              <div key={exp.id} className="relative border-l-2 border-yellow-500 pl-4 ml-3">
                  <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[7px] top-1"></div>
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <h4 className="text-gray-500">{exp.company} / {exp.location || "Remote"}</h4>
                  <p className="text-yellow-500 text-sm">{exp.startDate} - {exp.endDate}</p>
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-3">•</div>
              <h2 className="text-xl font-bold">SKILLS</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {resumeData.skills.map((skill, index) =>
              <div key={index} className="flex items-center">
                  <div className="mr-2 w-24">
                    <div className="font-medium">{skill}</div>
                  </div>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${85 - index * 5}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ModernYellowTemplate;