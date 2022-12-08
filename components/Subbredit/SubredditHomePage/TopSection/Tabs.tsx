import React from 'react'

const Tabs = () => {
  return (
    <div
        className='w-full bg-white flex flex-row items-center justify-center space-x-5 px-4 '
    >
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2 border-b-[#0079D3]'> Posts </p>
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2 border-b-[#0079D3]'> Events </p>
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2 border-b-[#0079D3]'> Rules </p>
        <p className='h-full py-2 text-center font-semibold text-sm hover:cursor-pointer border-b-2 border-b-[#0079D3]'> About </p>
    </div>
  )
}

export default Tabs