import styled from 'styled-components';
import React, { useState } from 'react';
import { PatternBg } from '../PatternBg';
import * as Form from '@radix-ui/react-form';
import useWriteEmail from '@/hooks/api/usePostUserDetails';
import { useGlobalStore } from '@/store/global';
import { FormSelect } from '../common';


interface WriteEmailProps {
  activeStepIndex: number;
  next: () => void;
  prev: () => void;
}

const WriteEmail = ({ activeStepIndex, next, prev }: WriteEmailProps) => {
  const { emailInfo: emailInfo } = useGlobalStore();
  const {
    data,
    isFetching,
    isLoading,
    refetch: sendUserDetails,
  } = useWriteEmail(
    {
      subject: emailInfo?.subject ?? '',
      company: emailInfo?.company ?? '',
      emailFormat: emailInfo?.emailFormat ?? ''
    },
    false,
  );

  console.log('useInfo req', { data, isFetching, isLoading });

  return (
    <div className='flex min-h-[500px] space-x-8'>
       <PatternBg className='sm:min-w-[18px] md:w-1/4 lg:w-1/4 bg-[size:250px] min-h-[100vh] max-w-[800px]'>
        &nbsp;
      </PatternBg>
      <div className='flex flex-1 mx-auto mt-[50px] flex-col'>
        <h2 className='text-[24px] text-slate-500 mt-100 h-10'>Write an email to the company</h2>
        <Separator className='border-slate-100 border-[1px] mt-8 mb-8 max-w-[500px]' />
        <WriteEmailForm />
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

interface WriteEmailFormProps { }

const WriteEmailForm = ({ }: WriteEmailFormProps) => {

  const { emailInfo, setEmailInfo } = useGlobalStore();
  const [companyName, setCompanyName] = useState<string>(emailInfo?.company ?? '');
  const [subject, setEmailSubject] = useState<string>(emailInfo?.subject ?? '');

  return (
    <div className='flex flex-col'>
      <Form.Root className='w-[320px]' onSubmit={
        (event) => {
          event.preventDefault();
          alert(`companyName + companyUrl ${companyName} ${subject}`)
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
            <FormSelect className='' items={[{'label': 'Company 1', 'value':'ocmp'},{'label': 'Company 2', 'value':'oa'},{'label': 'Company 3', 'value':'dd'} ]} placeholder={"Pick a company.."}/>
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
              Format of the Email
            </Form.Label>
            <Form.Message className='text-[12px] text-slate-500 opacity-[0.8]' match='valueMissing'>
              Please provide a valid email format
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className='box-border w-full inline-flex appearance-none items-center justify-center rounded-[6px] px-[10px] text-[15px] leading-none text-slate-600 border-[1px] border-slate-500 outline-none hover:shadow-[0_0_0_1px_black]'
              value={subject}
              rows={20}
              required
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className='box-border w-full text-white inline-flex h-[35px] items-center justify-center rounded-[6px] bg-slate-800 px-[16px] py-[8px] font-medium leading-none focus:outline-none mt-[10px]'>
            Add &nbsp; &rarr;
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};


export default WriteEmail;
