'use client'
import Image from 'next/image'
import React from 'react'
import Error500Image from '../../../public/500.png'
import HeadingBlue25px from '../shared/HeadingBlue25px'
import ParagraphBlue2 from '../shared/ParagraphBlue2'
import Button from '../shared/Button'
import Footer from '../shared/Footer'
import { useRouter } from 'next/navigation'

const Error500 = () => {
  const router = useRouter()

  return (
    <>
    <div className='flex flex-col justify-center items-center py-10 '>
      <Image
      src={Error500Image}
      alt='500'
      height={300}
      width={200}
      className='bg-white w-[80%] lg:w-1/3 h-1/2'
      />

      <h1 className='text-7xl lg:text-8xl font-bold text-custom-dark-blue-1 pb-5'>500</h1>
      <HeadingBlue25px children='UNEXPECTED ERROR' />
      <div className='my-5 px-10 space-y-2'>
      <ParagraphBlue2
      children="Sorry, something went wrong."
      />
      <ParagraphBlue2
      children="Try reloading the page. We're working hard to fix it as soon as possible."
      />
      </div>
      <Button
      onClick={()=> router.back()}
      children='Go Back'
      className='rounded-lg py-2 text-white w-[300px]'
      variant='primary'
      />

      </div>
      <Footer/>
    </>
  )
}

export default Error500