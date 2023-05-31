import React from 'react';
import styled from 'styled-components';
import { PurpleBg } from '../PatternBg';
import { StyledArrowButton, SvgLoader } from '../common';
import { motion } from 'framer-motion';
import { Company } from '@/interfaces';
import useGetCompanies from '@/hooks/api/useGetCompanies';

interface AddCompanySuccessProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const AddCompanySuccess = ({ activeStepIndex, next, prev }: AddCompanySuccessProps) => {
  const  { isLoading, error, data } = useGetCompanies();
  console.log("Data from useGetCompanies", data);
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
       { data && <CompanyList companies={(data && data.companies) || []} /> }
       { isLoading && <SvgLoader /> }
        <AddMoreButton onClick={() => {
            console.log('Write Again');
            prev(); }
          } />
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
interface CompanyListProps { 
  companies: Company[];
}

const CompanyList = ({companies}:CompanyListProps) => {
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
            <span className='px-10'>{company.company}</span>
            <span className='px-10'>{company.website}</span>
            <span className='px-10'>{company.status == "indexed" ? "Scraped" : company.status == "scraped" ? "Indexing": "Scraping"}</span>
          </div>))
        }
      </div>
      </div>);
}

const AddMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledArrowButton
      whileHover={{ x: 3 }}
      onClick={() => onClick()}
      className='cursor-pointer mt-[100px] text-xl'
    >
      &larr; Add More
    </StyledArrowButton>
  );
};

const TextP =  styled.p`
  whitespace: pre-line;
`

export default AddCompanySuccess;
