export interface FormData {
  personal: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    title?: string;
    about?: string;
  };
  skills: Array<{
    category: string;
    skills: Array<{
      name: string;
      level: number;
    }>;
  }>;
  projects: Array<{
    title: string;
    description: string;
    tech: string[] | string;
    github?: string;
    live?: string;
    image?: string;
  }>;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface StepProps {
  data: FormData;
  updateData: (stepData: any, stepName: keyof FormData) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}
