import {AiOutlineMessage , AiOutlineBell } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'

const HeaderButtonOptions = () => {
  return (
    <div className=' hidden md:inline-flex justify-between items-center bg-red-100 space-x-2 px-5'>
        <AiOutlineMessage className='h-6 w-6 text-gray-800 hover:cursor-pointer' />
        <AiOutlineBell className='h-6 w-6 text-gray-800 hover:cursor-pointer' />
        <BiPlus  className='h-6 w-6 text-gray-800 hover:cursor-pointer'/>
    </div>
  )
}

export default HeaderButtonOptions