import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PersonalInfoStep from './PersonalInfoStep';
import SkillsStep from './SkillsStep';
import ProjectsStep from './ProjectsStep';
import SocialLinksStep from './SocialLinksStep';
import PreviewStep from './PreviewStep';
import { usePortfolio } from '../../context/PortfolioContext';

const SetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    skills: [],
    projects: [],
    social: {},
  });

  const { updatePortfolioData, completeSetup } = usePortfolio();

  // Load saved wizard data on mount
  useEffect(() => {
    const savedWizardData = localStorage.getItem('wizardFormData');
    if (savedWizardData) {
      try {
        setFormData(JSON.parse(savedWizardData));
      } catch (error) {
        console.error('Error loading wizard data:', error);
      }
    }
  }, []);

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Projects', component: ProjectsStep },
    { title: 'Social Links', component: SocialLinksStep },
    { title: 'Preview', component: PreviewStep },
  ];

  const updateFormData = (stepData, stepName) => {
    const newFormData = {
      ...formData,
      [stepName]: stepData,
    };
    setFormData(newFormData);
    localStorage.setItem('wizardFormData', JSON.stringify(newFormData));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log('Generating portfolio with data:', formData);
    
    // Update portfolio data
    updatePortfolioData(formData);
    
    // Complete setup
    setTimeout(() => {
      completeSetup();
      localStorage.removeItem('wizardFormData');
    }, 100);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    index <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            {steps.map((step) => (
              <span key={step.title} className="flex-1 text-center">
                {step.title}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">
            {steps[currentStep].title}
          </h2>
          
          <CurrentStepComponent
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            onComplete={handleComplete}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SetupWizard;
