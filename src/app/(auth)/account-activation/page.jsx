'use client';
import AccountActivationUI from '@/components/authComponent/AccountActivationUI';
import Logo from '@/components/shared/Logo';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const AccountActivationContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  console.log('email', email);
  return <AccountActivationUI email={email} />;
};

const AccountActivation = () => {
  return (
    <div>
      <div className='flex justify-center items-center pt-5 lg:hidden'>
        <Logo />
      </div>
      <div className='pt-5 pl-10 lg:block hidden'>
        <Logo />
      </div>
      <Suspense fallback={<p className="min-h-screen text-center">Loading...</p>}>
        <AccountActivationContent />
      </Suspense>
    </div>
  );
};

export default AccountActivation;
