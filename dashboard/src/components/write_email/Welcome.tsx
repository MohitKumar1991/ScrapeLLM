import React from 'react';
import { motion } from 'framer-motion';
import { PatternBg, GradientBg, PatternBg2 } from '../PatternBg';
import { CenteredImage, StyledArrowButton } from '../common';
import { ActionType } from '@/interfaces';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useGlobalStore } from '@/store/global';


interface WelcomeProps {
  activeStepIndex: number;
  next: () => void;
}

const Welcome = ({ activeStepIndex, next }: WelcomeProps) => {
  const { selectedAction: selectedAction, selectAction } = useGlobalStore();
    const onActionSelect = (actionType: ActionType) => {
      selectAction(actionType);
      next();
  };
  return (
    <div className='flex h-[100vh] space-x-4'>
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
      <div className='flex flex-1 items-center mx-auto mt-[50px] flex-col'>
  
        <h2 className='text-[24px] text-center px-10 py-3 rounded-2xl text-gray-600 mt-100'>
          Welcome to SCRAPE LLM !
        </h2>
        {/* <h3 className='text-[18px] text-gray-600 sm:text-[21px] font-light mt-50 h-10'>What would you like to do ?</h3> */}
        
        <ActionSelection
          cardType={ActionType.WriteEmail}
          onActionSelect={onActionSelect}
          isSelected={selectedAction == ActionType.WriteEmail}
        />
        
        <ActionSelection
          cardType={ActionType.AddCompany}
          onActionSelect={onActionSelect}
          isSelected={selectedAction == ActionType.AddCompany}
        />
        
        <GetStartedButton onClick={() => next()} />
      </div>
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
    </div>
  );
};

const GetStartedButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledArrowButton
      whileHover={{ x: 3 }}
      onClick={() => onClick()}
      className='cursor-pointer mt-[100px] text-xl'
    >
      Get Started &nbsp; &rarr;
    </StyledArrowButton>
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
      className={`flex border flex-col mt-[20px] md:space-x-7 sm:space-y-4 items-start p-3 py-4 max-w-[800px]  min-w-[600px] cursor-pointer hover:bg-slate-100 rounded-xl ${selectedClassAttrs}`}
    >
      <div className='flex space-x-4'>
       <div className='text-[50px] text-red'>{ actionType == ActionType.AddCompany ? `\u261D` : `\u270D`} </div>
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


export default Welcome;
