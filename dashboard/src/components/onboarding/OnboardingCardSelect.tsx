import styled from 'styled-components';
import React from 'react';
import { motion } from 'framer-motion';
import { PatternBg } from '../PatternBg';
import { useOnboardingStore } from '@/store/onboarding';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { ActionType } from '@/interfaces/action';

interface OnboardingCardSelectProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const OnboardingActionSelect = ({ activeStepIndex, next, prev }: OnboardingCardSelectProps) => {
  const { selectedAction: selectedAction, selectAction } = useOnboardingStore();
  const onActionSelect = (actionType: ActionType) => {
      selectAction(actionType);
      next();
  };
  return (
    <div className='flex min-h-[500px] space-x-8'>
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
      <div className='flex flex-1 mx-auto mt-[50px] flex-col'>
        <h2 className='text-[24px] text-gray-500 font-light mt-100 h-10'>
          What would you like to do today?
        </h2>
        <p className='text-[16px] text-slate-400 leading-8'>
          
        </p>
        <hr className='border-slate-100 border-[1px] mt-8' />
        <ActionSelection
          cardType={ActionType.AddCompany}
          onActionSelect={onActionSelect}
          isSelected={selectedAction == ActionType.AddCompany}
        />
        <ActionSelection
          cardType={ActionType.WriteEmail}
          onActionSelect={onActionSelect}
          isSelected={selectedAction == ActionType.WriteEmail}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
    </div>
  );
};

interface ActionSelectionProps {
  cardType: ActionType;
  onActionSelect: (ct: ActionType) => void;
  isSelected: boolean;
}
const ActionSelection = ({ cardType: actionType, onActionSelect, isSelected }: ActionSelectionProps) => {
  const cardImage = actionType == ActionType.AddCompany ? '/white-card.png' : '/black-card.png';
  const selectedClassAttrs = isSelected ? 'bg-slate-100' : 'bg-none';
  return (
    <motion.div
      onClick={() => onActionSelect(actionType)}
      whileHover={{ x: 2 }}
      className={`flex border flex-col mt-[20px] md:space-x-7 sm:space-y-4 items-start p-3 py-4 max-w-[800px] cursor-pointer hover:bg-slate-100 rounded-xl ${selectedClassAttrs}`}
    >
      <div className='flex space-x-4'>
       <div className='text-[50px] text-red'>{ actionType == ActionType.AddCompany ? `\u2753` : `\u2B55`} </div>
        <div className='flex flex-col'>
          <div className='flex items-center space-x-4'>
            <h3 className='text-[18px] text-slate-700'>{actionType}</h3>
            {isSelected && <CheckCircledIcon className='text sm:block' color="gray" width={21} height={21} />}
          </div>
          <p className='text-[14px] text-slate-400 leading-7 mt-[10px]'>
          { actionType == ActionType.AddCompany ? `Ask questions about a company already indexed` : `Compose an email to the company`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingActionSelect;
