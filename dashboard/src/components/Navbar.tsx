import styled from 'styled-components'
import React from 'react';
import Stepper from './Stepper';
import { motion } from 'framer-motion';

const BackButton = styled(motion.div)`
  cursor: pointer;
`;

const NextButton = styled(motion.div)`
  cursor: pointer;
`;

interface NavbarProps {
  numberOfSteps: number;
  activeStepIndex: number;
  prev: () => void;
  next: () => void;
}
/**
 * 
 * @param param0 
 * 
 * 
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

interface CommonNavbarProps {
  children?: React.ReactNode;
}

const CommonNavbar = (props: CommonNavbarProps) => {
  return (
    <div className='flex flex-row justify-between items-center p-2 px-6 border-b-slate-100 border-b-[1px] border-solid'>
      {/* <Logo /> */}
      {props.children}
      {/* <HamburgerMenuIcon className='sm:block md:hidden w-7 h-7 text-slate-400' fontSize={'40'} /> */}
    </div>
  );
};
        

const Navbar = ({ numberOfSteps, activeStepIndex, prev, next }: NavbarProps) => {
  return (
    <CommonNavbar>
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
    
    </CommonNavbar>
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

export default Navbar;
