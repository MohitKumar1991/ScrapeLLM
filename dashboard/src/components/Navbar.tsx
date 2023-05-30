import * as Avatar from '@radix-ui/react-avatar';
import { CaretDownIcon, DropdownMenuIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Logo as Logo } from './common';

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar = (props: NavbarProps) => {
  return (
    <div className='flex flex-row justify-between items-center p-2 px-6 border-b-slate-100 border-b-[1px] border-solid'>
      {/* <Logo /> */}
      {props.children}
      {/* <HamburgerMenuIcon className='sm:block md:hidden w-7 h-7 text-slate-400' fontSize={'40'} /> */}
    </div>
  );
};

export default Navbar;
