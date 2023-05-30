import OnboardingNavbar from '@/components/OnboardingNavbar';
import React from 'react';
import OnboardingWelcome from '@/components/onboarding/OnboardingWelcome';
import OnboardingActionSelect from '@/components/onboarding/OnboardingCardSelect';
import OnboardingPersonalInfo from '@/components/onboarding/OnboardingPersonalInfo';
import OnboardingAddCompany from '@/components/onboarding/OnboardingAddCompany';
import OnboardingSuccess from '@/components/onboarding/OnboardingSuccess';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { useOnboardingStore } from '@/store/onboarding';
import { ActionType } from '@/interfaces/action';
import AddCompanySuccess from '@/components/onboarding/AddCompanySuccess';

export default function Onboarding() {
  
  const steps = ['welcome', 'formStep', 'successStep'];
  const { currentStepIndex, next, prev } = useMultistepForm(steps);
  const { emailInfo } = useOnboardingStore();
  return (
    <div className='h-1000'>
      <OnboardingNavbar numberOfSteps={steps.length} activeStepIndex={currentStepIndex} next={next} prev={prev} />
      <OnboardingActiveStep activeStepIndex={currentStepIndex} next={next} prev={prev} />
    </div>
  );
}

interface OnboardingActiveStepProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const OnboardingActiveStep = (props: OnboardingActiveStepProps) => {
  const { selectedAction } = useOnboardingStore();
  const { activeStepIndex } = props;
  switch (activeStepIndex) {
    case 0:
      return <OnboardingWelcome {...props} />;
    case 1:
      return selectedAction == ActionType.AddCompany ? <OnboardingAddCompany {...props} /> : <OnboardingPersonalInfo {...props} />;
    case 2:
      return selectedAction == ActionType.AddCompany ? <AddCompanySuccess {...props}/>: <OnboardingSuccess {...props} />;
    default:
      return null;
  }
};
