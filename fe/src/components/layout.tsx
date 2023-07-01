import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({children}: LayoutProps) {

  return (
    <>
      <Header />
      <main className='flex flex-col mx-auto rounded-b-lg h-full px-4 py-2'>
        <hr className='border w-full'/>
        {children}
      </main>
    </>
  );
}
