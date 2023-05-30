import React from 'react';
import styled from 'styled-components';
import { PurpleBg } from '../PatternBg';
import { StyledArrowButton } from '../common';
import { motion } from 'framer-motion';

interface AddCompanySuccessProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const AddCompanySuccess = ({ activeStepIndex, next, prev }: AddCompanySuccessProps) => {
  const companies = [
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
    {
      name: 'Company 1',
      url: 'https://www.google.com',
      status: 1,
    },
  ]
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
          👋 Company Added
        </h2>
        <CompanyList companies={companies} />
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

const CompanyList = ({companies}) => {
  return (<div className="rounded-md overflow-y-scroll text-gray-500 border-separate border-spacing-2 border border-slate-500 min-h-[300px]">
        <div className='border text-gray-700 font-semibold text-center py-2'>
          COMPANIES IN LIST
        </div> 
        <div className='border text-gray-700 text-center p-2 flex justify-between'>
          <span className='px-10'>Name</span>
          <span className='px-10'>Url</span>
          <span className='px-10'>Scraping Status</span>
        </div>

      <div>
        {
          companies.map(company => (<div className='border rounded-md border-separate p-2 flex justify-between'>
            <span className='px-10'>{company.name}</span>
            <span className='px-10'>{company.url}</span>
            <span className='px-10'>{company.status == 2 ? "Scraped" : company.status == 1 ? "Scraping" : "Not Scraped"}</span>
          </div>))
        }
      </div>
      </div>);
}

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

export default AddCompanySuccess;
