import { useState } from 'react'
import {AiOutlineMessage , AiOutlineBell } from 'react-icons/ai'
import { BiPlus } from 'react-icons/bi'
import CreateCommunityModal from '../../Community/Create/CreateCommunityModal'

const HeaderButtonOptions = () => {
  let [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState(false)

  function closeModal() {
    setIsCreateCommunityModalOpen(false)
  }

  function openModal() {
    setIsCreateCommunityModalOpen(true)
  }

  return (
    <div className='bg-emerald-100 z-50 hidden md:inline-flex justify-between items-center space-x-2 px-7'>
      
        <AiOutlineMessage className='h-6 w-6 text-gray-800 hover:cursor-pointer' />
        <AiOutlineBell  className='h-6 w-6 text-gray-800 hover:cursor-pointer' />
        <CreateCommunityModal  
          isCreateCommunityModalOpen={isCreateCommunityModalOpen} 
          openModal={openModal} 
          closeModal={closeModal} 
        />
        <BiPlus 
          onClick={() => openModal()} 
          className='h-6 w-6 text-gray-800 hover:cursor-pointer'
          />
    </div>
  )
}

export default HeaderButtonOptions