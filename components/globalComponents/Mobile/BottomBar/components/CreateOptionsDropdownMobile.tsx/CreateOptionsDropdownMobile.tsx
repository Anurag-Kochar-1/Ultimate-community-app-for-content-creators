
// CreateOptionsDropdownMobile

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaUserAlt , FaEye , FaLock } from 'react-icons/fa'
import { useRouter } from "next/router"


interface Props {
    openModal: () => void
    closeModal: () => void
    isCreateCommunityModalOpen: boolean
}


export default function CreateOptionsDropdownMobile ({isCreateCommunityModalOpen , openModal , closeModal}:Props) {



  return (
    <>
      <Transition appear show={isCreateCommunityModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-lightColor w-[40vh] h-[25vh] flex flex-col items-center justify-center transform overflow-y-scoll overflow-x-hidden rounded-2xl p-6 text-center align-middle shadow-xl transition-all">

                  <div className="w-full py-2 my-1">
                    <p className="text-normal font-medium text-darkColor">
                      Create a community
                    </p>
                  </div>

                  <div className="w-full py-2 my-1">
                    <p className="text-normal font-medium text-darkColor">
                      Upload a post
                    </p>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
