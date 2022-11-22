import Image from 'next/image'
import logo from "../../public/images/logo.png"
import name from "../../public/images/name.png"


const LogoWname = () => {
  return (
    <div className='hidden md:inline-flex w-36 h-full  justify-between items-center space-x-2 px-2'>
        <Image src={logo} alt="logo" className='w-10 h-10' />
        <Image src={name} alt="name" className='w-20 h-15' />
    </div>
  )
}

export default LogoWname