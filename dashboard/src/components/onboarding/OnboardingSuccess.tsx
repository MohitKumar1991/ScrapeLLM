import React from 'react';
import styled from 'styled-components';
import { PatternBg, PurpleBg } from '../PatternBg';
import { StyledArrowButton } from '../common';
import { motion } from 'framer-motion';

interface OnboardingSuccessProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const OnboardingSuccess = ({ activeStepIndex, next, prev }: OnboardingSuccessProps) => {
  return (
    <div className='flex h-[500px] space-x-4'>
      <PurpleBg className='flex min-w-[4px] sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px] items-center justify-center text-[96px]'>
        <motion.span
          className='hidden md:block'
          initial={{ rotate: 0 }}
          animate={{ rotate: [-48, 0, -48] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          &nbsp; 🎉
        </motion.span>
      </PurpleBg>
      <div className='flex flex-1 items-center mx-auto mt-[100px] flex-col'>
        <h2 className='text-[18px] sm:text-[21px] text-gray-600 mt-100 h-10 mb-6'>
          👋 Your Email is Ready
        </h2>
        <TextP className='text-[16px] text-slate-400 px-4 text-center'>
          Hi, &#10;&#13;
          This is your email 
          and it is full of problems
        </TextP>
        <WriteAgainButton onClick={() => console.log('add funds')} />
      </div>
      <PurpleBg className='flex min-w-[4px] sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px] items-center justify-center text-[96px]'>
        <motion.span
          className='hidden md:block'
          initial={{ rotate: 0 }}
          animate={{ rotate: [-48, 0, -48] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          &nbsp; 🎉
        </motion.span>
      </PurpleBg>
    </div>
    
  );
};

const WriteAgainButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledArrowButton
      whileHover={{ x: 3 }}
      onClick={() => onClick()}
      className='cursor-pointer mt-[100px] text-xl'
    >
      &larr; Write Again
    </StyledArrowButton>
  );
};

const TextP =  styled.p`
  whitespace: pre-line;
`

export default OnboardingSuccess;
