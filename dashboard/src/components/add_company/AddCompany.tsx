import styled from 'styled-components';
import React, { use, useEffect, useState } from 'react';
import { PatternBg } from '../PatternBg';
import * as Form from '@radix-ui/react-form';
import usePostAddCompany from '@/hooks/api/usePostAddCompany';
import { SvgLoader } from '../common';

interface AddCompanyProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const AddCompany = ({
  activeStepIndex,
  next,
  prev,
}: AddCompanyProps) => {

  return (
    <div className='flex h-[500px] space-x-8 text-center'>
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
      <div className='flex flex-1 mx-auto mt-[50px] flex-col'>
        {/* <h2 className='text-[24px] text-gray-500 mt-100 h-10 mb-6'>Add details of the company you want to add</h2> */}
        <AddCompanyForm></AddCompanyForm>
        <Separator className='border-gray-300 border-[1px] mt-8 mb-8 max-w-[800px]' />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
    </div>
  );
};

const Separator = styled.hr``;

interface AddCompanyFormProps { }

const AddCompanyForm = ({ }: AddCompanyFormProps) => {

  const [companyName, setCompanyName] = useState<string>('');
  const [companyUrl, setCompanyUrl] = useState<string>('');
  //submit form when isSubmitting is true
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
  const { isLoading, error, data } = usePostAddCompany(companyName, companyUrl, isSubmitting);

  return (
    <div className='flex flex-col items-center'>
      <Form.Root className='w-[320px]' onSubmit={
        (event) => {
          event.preventDefault();
          !isLoading && setIsSubmitting(true);
        }
      }>
        <h3 className='text-[25px] text-slate-500 leading-8'>
          Add Company Details
        </h3>
        <Separator className='border-slate-100 border-[1px] mt-8 mb-8 max-w-[500px]' />
        { isLoading && <SvgLoader /> }
        <Form.Field className='grid mb-[12px]' name='firstName'>
          <div className='flex items-center justify-between'>
            <Form.Label className='text-[15px] leading-[35px] text-slate-500'>
              Company Name
            </Form.Label>
            <Form.Message className='text-[12px] text-slate-500 opacity-[0.8]' match='valueMissing'>
              Missing Company Name
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className='box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[6px] px-[10px] text-[15px] leading-none text-slate-600 border-[1px] border-slate-500outline-none hover:shadow-[0_0_0_1px_black]'
              type='text'
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className='grid mb-[12px]' name='middleName'>
          <div className='flex items-baseline justify-between'>
            <Form.Label className='text-[15px] leading-[35px] text-slate-500'>
              URL to Scrape
            </Form.Label>
            <Form.Message className='text-[12px] text-slate-500 opacity-[0.8]' match='valueMissing'>
              Missing URL to Scrape
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className='box-border w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[6px] px-[10px] text-[15px] leading-none text-slate-600 border-[1px] border-slate-500outline-none hover:shadow-[0_0_0_1px_black]'
              type='text'
              value={companyUrl}
              required
              onChange={(e) => setCompanyUrl(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className='box-border w-full text-white inline-flex h-[35px] items-center justify-center rounded-[6px] bg-slate-800 px-[16px] py-[8px] font-medium leading-none focus:outline-none mt-[10px]' >
            Add &nbsp; &rarr;
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};



export default AddCompany;
