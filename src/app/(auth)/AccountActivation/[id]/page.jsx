'use client'
import AccountActivationUI from '@/components/authComponent/AccountActivationUI'
import Logo from '@/components/shared/Logo'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const AccountActivation = () => {
  const params = useParams()


  console.log('id',params.id)
  return (
    <div>
      <div className='flex justify-center items-center pt-5 lg:hidden'>  <Logo/></div>
      <div className='pt-5 pl-10 lg:block hidden'>  <Logo/></div>
        <AccountActivationUI/>
    </div>
  )
}

export default AccountActivation