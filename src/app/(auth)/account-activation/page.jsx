'use client'
import AccountActivationUI from '@/components/authComponent/AccountActivationUI'
import Logo from '@/components/shared/Logo'
import { useSearchParams } from 'next/navigation'


const AccountActivation = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  console.log('emaiil', email)
  return (
    <div>
      <div className='flex justify-center items-center pt-5 lg:hidden'>  <Logo/></div>
      <div className='pt-5 pl-10 lg:block hidden'>  <Logo/></div>
        <AccountActivationUI email={email}/>
    </div>
  )
}

export default AccountActivation