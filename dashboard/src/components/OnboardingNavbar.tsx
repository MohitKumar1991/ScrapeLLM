import styled from 'styled-components'
import React from 'react';
import Navbar from './Navbar';
import Stepper from './Stepper';
import { motion } from 'framer-motion';

const BackButton = styled(motion.div)`
  cursor: pointer;
`;

const NextButton = styled(motion.div)`
  cursor: pointer;
`;

interface OnboardingNavbarProps {
  numberOfSteps: number;
  activeStepIndex: number;
  prev: () => void;
  next: () => void;
}
/**
 * 
 * @param param0 
 * 
 * onboarding personal step
 * <BottomBar
          activeStepIndex={activeStepIndex}
          prev={prev}
          next={() => {
            sendUserDetails();
            next();
          }}
        />
 * @returns 
 */

const OnboardingNavbar = ({ numberOfSteps, activeStepIndex, prev, next }: OnboardingNavbarProps) => {
  return (
    <Navbar>
      {prev && (
        <BackButton className="text-gray-600" onClick={() => prev()} whileHover={{ x: -2 }}>
          &larr; &nbsp; Back
        </BackButton>
      )}
      <StepperHeader numberOfSteps={numberOfSteps} activeStepIndex={activeStepIndex} />
      {/* <div className='fixed bottom-0 right-0 left-0 bg-white h-[50px] items-center flex border-t-slate-200 border-t-[1px] px-4 text-slate-400 justify-between'>
      </div> */}
      {next && (
        <NextButton className="text-gray-600" onClick={() => next()} whileHover={{ x: 2 }}>
          Next &nbsp; &rarr;
        </NextButton>
      )}
    
    </Navbar>
  );
};

const StepperHeader = ({
  numberOfSteps,
activeStepIndex,
}: {
  numberOfSteps: number;
  activeStepIndex: number;
}) => {
  return activeStepIndex + 1 <= numberOfSteps ? (
    <div className='flex flex-col items-center space-y-2 my-2'>
      <span className='text-slate-500 font-normal text-[13px]'>
        Step {activeStepIndex + 1} of {numberOfSteps}
      </span>
      <Stepper numberOfSteps={numberOfSteps} activeStepIndex={activeStepIndex} />
    </div>
  ) : null;
};

export default OnboardingNavbar;
