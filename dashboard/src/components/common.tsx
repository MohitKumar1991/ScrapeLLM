import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

export const Logo = () => {
  return <img src='/magik-logo.png' className='h-8 w-7' />;
};

export interface SelectionItem {
  label: string;
  value: string;
}

export interface FormSelectOptions {
  placeholder: string;
  items: SelectionItem[];
}

export const StyledArrowButton = styled(motion.h2)`
  background: linear-gradient(260.9deg, #d039ec 3.73%, #6f66d9 124%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const ContinueButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <StyledArrowButton
      whileHover={{ x: 3 }}
      onClick={() => onClick()}
      className='cursor-pointer mt-[30px] text-xl'
    >
      {text}
    </StyledArrowButton>
  );
};

export const CenteredImage = styled.div`
  margin: 0 auto; 
  padding: 0 100px;
  overflow: hidden;
`


const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});


export const FormSelect = ({ placeholder, items }):FormSelectOptions => {
  return (<Select.Root>
    <Select.Trigger className="SelectTrigger text-gray-500 " aria-label="Food">
      <Select.Value placeholder={placeholder || "Please pick one"} />
      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">    
          { items.map(item => <SelectItem value={item.value}> {item.label} </SelectItem> )}
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>);

  };
  
  
