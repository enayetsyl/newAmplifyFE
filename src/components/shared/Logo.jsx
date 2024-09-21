import Image from 'next/image'
import logo from '../../../public/logo.svg'

const Logo = () => {
  return (
    <div className='hidden md:flex'>
        <Image
        src={logo}
        alt='logo'
        height={60}
        width={180}
        />
    </div>
  )
}

export default Logo