import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { RiAddFill } from 'react-icons/ri'

const CreateOptionsDropdown = () => {
    return (
        <div className="text-right hidden lg:inline-block">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-whit">
                <RiAddFill className='inline-block w-6 h-6 mt-2 text-darkColor hover:cursor-pointer' />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-3 py-1 my-1">
                  <Menu.Item as={Fragment}>
                        <Link href={"/CreateCommunity"}>
                          <button
                          type='button'
                          >
                            Create Community
                          </button>
                        </Link>
                  </Menu.Item>
                </div>

                <div className="px-3 py-1 my-1">
                  <Menu.Item as={Fragment}>
                        <button
                        type='button'
                        >
                          Upload Post
                        </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )
  
}

export default CreateOptionsDropdown