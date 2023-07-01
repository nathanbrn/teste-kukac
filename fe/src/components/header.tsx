import Image from 'next/image';
import Logo from '../assets/Logo.svg';
import SwipeableTemporaryDrawer from './drawer';

export function Header() {
  return (
    <header className='flex justify-between px-2 items-center mx-auto bg-white rounded-t-lg'>
      <div className='flex justify-between rounded-lg px-4 py-2'>
        <Image
          src={Logo}
          alt='Logo'
          width={200}
        />
      </div>
      <SwipeableTemporaryDrawer />
    </header>
  );
}
