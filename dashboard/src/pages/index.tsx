import Navbar from '@/components/Navbar';
import React from 'react';
import Welcome from '@/components/write_email/Welcome';
import WriteEmail from '@/components/write_email/WriteEmail';
import AddCompany from '@/components/add_company/AddCompany';
import WriteEmailSuccess from '@/components/write_email/WriteEmailSuccess';
import { useMultistepForm } from '@/hooks/useMultistepForm';
import { useGlobalStore } from '@/store/global';
import { ActionType } from '@/interfaces';
import AddCompanySuccess from '@/components/add_company/AddCompanySuccess';

export default function Home() {
  
  const steps = ['welcome', 'formStep', 'successStep'];
  const { currentStepIndex, next, prev } = useMultistepForm(steps);
  const { emailInfo } = useGlobalStore();
  return (
    <div className='h-1000'>
      <Navbar numberOfSteps={steps.length} activeStepIndex={currentStepIndex} next={next} prev={prev} />
      <ActiveStep activeStepIndex={currentStepIndex} next={next} prev={prev} />
    </div>
  );
}

interface ActiveStepProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const ActiveStep = (props: ActiveStepProps) => {
  const { selectedAction } = useGlobalStore();
  const { activeStepIndex } = props;
  switch (activeStepIndex) {
    case 0:
      return <Welcome {...props} />;
    case 1:
      return selectedAction == ActionType.AddCompany ? <AddCompany {...props} /> : <WriteEmail {...props} />;
    case 2:
      return selectedAction == ActionType.AddCompany ? <AddCompanySuccess {...props}/>: <WriteEmailSuccess {...props} />;
    default:
      return null;
  }
};
