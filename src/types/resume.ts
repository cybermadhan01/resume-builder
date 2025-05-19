export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  title: string;
  summary: string;
  profileImage?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export type TemplateType = "basic" | "modern" | "professional" | string;

export interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: string;
}