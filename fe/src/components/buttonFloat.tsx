import { PlusIcon } from '@heroicons/react/24/solid';

interface ButtonProps {
  onClick: () => void;
}

export function ButtonFloat({ onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className='fixed bottom-16 right-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 py-5 px-5'>
      <PlusIcon className='w-6' />
    </button>
  );
}
