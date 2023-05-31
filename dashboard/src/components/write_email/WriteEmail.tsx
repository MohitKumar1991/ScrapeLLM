import styled from 'styled-components';
import React, { useState } from 'react';
import { PatternBg } from '../PatternBg';
import * as Form from '@radix-ui/react-form';
import useWriteEmail from '@/hooks/api/usePostWriteEmail';
import { useGlobalStore } from '@/store/global';
import { FormSelect, SvgLoader } from '../common';
import useGetCompanies from '@/hooks/api/useGetCompanies';


interface WriteEmailProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

interface EmailContainerProps {
  subject: string;
  email: string;
}

const EmailContainer = ({subject, email}:EmailContainerProps) => {

  return (
    <div className='block w-[320px] rounded-3xl mt-10 bg-slate-800 md:w-[420px] py-[12px] px-[20px]'>
      <h2 className='text-slate-200 p-3 md:p-5 text-[12px] md:text-[16px]'>Subject: {subject}</h2>
      <hr className='border-slate-600' />
      <p className='text-slate-400 p-3 md:p-5 font-mono leading-[32px] text-[12px] md:text-[16px] md:leading-[40px]'>
        {email}
      </p>
    </div>
  );

};

const WriteEmail = ({ activeStepIndex, next, prev }: WriteEmailProps) => {

  const { isSuccess, data: companyData } = useGetCompanies();
  const [companyName, setCompanyName] = useState<string>('');
  const [subject, setEmailSubject] = useState<string>('');
  const [ownCompanyAbout, setOwnAbout] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const {
    data,
    isSuccess:isEmailWriteSuccess,
    isLoading
  } = useWriteEmail(
    {
      subject: subject,
      company: companyName,
      ownCompanyAbout: ownCompanyAbout
    },
    isSubmitted,
  );
  return (
    <div className='flex min-h-[500px] space-x-8'>
      <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
      <div className='flex flex-1 mx-auto mt-[50px] flex-col'>
        <h2 className='text-[24px] text-slate-500 mt-100 h-10'>Write an email to the company</h2>
        <Separator className='border-slate-100 border-[1px] mt-8 mb-8 max-w-[500px]' />
        <div className='flex flex-col'>
          <div>
          { isEmailWriteSuccess ? <EmailContainer subject={subject} email={data.email} /> : null }
          { isLoading && <SvgLoader /> }
          </div>
         { !isLoading && <Form.Root className='w-[320px]' onSubmit={
            (event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }
          }>
            <Form.Field className='grid mb-[12px]' name='subject'>
              <div className='flex items-baseline justify-between'>
                <Form.Label className='text-[15px] leading-[35px] text-slate-500'>
                  Select a company
                </Form.Label>
                <Form.Message className='text-[12px] text-slate-500 opacity-[0.8]' match='valueMissing'>
                  Please select a company
                </Form.Message>
              </div>
              <Form.Control asChild>
                <FormSelect items={isSuccess ? companyData.companies : []} placeholder={"Pick a company.."}  onValueChange={(value) => {
                    setCompanyName(value);
                  }}/>
              </Form.Control>
            </Form.Field>
            <Form.Field className='grid mb-[12px]' name='subject'>
              <div className='flex items-baseline justify-between'>
                <Form.Label className='text-[15px] leading-[35px] text-slate-500'>
                  Subject
                </Form.Label>
                <Form.Message className='text-[12px] text-slate-500 opacity-[0.8]' match='valueMissing'>
                  Provide a subject for the email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className='box-border h-[35px] w-full inline-flex appearance-none items-center justify-center rounded-[6px] px-[10px] text-[15px] leading-none text-slate-600 border-[1px] border-slate-500 outline-none hover:shadow-[0_0_0_1px_black]'
                  value={subject}
                  required
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className='grid mb-[12px]' name='emailFormat'>
              <div className='flex items-baseline justify-between'>
                <Form.Label className='text-[15px] leading-[35px] text-slate-500'>
                  Your own capabilties
                </Form.Label>
                <Form.Message className='text-[12px] text-slate-500 opacity-[0.8]' match='valueMissing'>
                  Please provide details on what can you do
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  className='box-border w-full inline-flex appearance-none items-center justify-center rounded-[6px] px-[10px] text-[15px] leading-none text-slate-600 border-[1px] border-slate-500 outline-none hover:shadow-[0_0_0_1px_black]'
                  value={ownCompanyAbout}
                  rows={20}
                  required
                  onChange={(e) => setOwnAbout(e.target.value)}
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <button className='box-border w-full text-white inline-flex h-[35px] items-center justify-center rounded-[6px] bg-slate-800 px-[16px] py-[8px] font-medium leading-none focus:outline-none mt-[10px]' 
                disabled={isLoading}>
                Add &nbsp; &rarr;
              </button>
            </Form.Submit>
          </Form.Root> }
        </div>
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

const Separator = styled.hr``;

export default WriteEmail;
