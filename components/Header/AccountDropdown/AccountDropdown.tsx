import React from 'react'
import {AiOutlineUser} from "react-icons/ai"


import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DarkModeToggle from './DarkModeToggle'
import { auth } from '../../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function AccountDropdown() {
  const [user] = useAuthState(auth);
  return (
    <div className="px-0 text-right w-[20%] md:w-[10%] lg:w-[15%] bg-red-300">
      <Menu as="div" className="relative w-full bg-green-300 inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md border  border-gray-200 px-3 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {!user && <AiOutlineUser className='w-5 h-5 text-gray-200'/>}

            {user && (
              <div className='flex items-center justify-between space-x-2'>
                <img src={user?.photoURL as string} alt="dp" className='w-7 h-7 rounded-full aspect-auto'/>
                <p className='hidden lg:inline-block text-black font-normal text-sm'> {user.displayName} </p>
              </div>
            )}

            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5  text-gray-400 hidden lg:inline-block"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#FF4500] text-white' : 'text-gray-900'
                    } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <div className='w-full flex'>
                        {active ? (
                        <IconMoonOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <IconMoonOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                        />
                        )}
                            <p> Dark Mode </p>
                    </div>
                        <DarkModeToggle />
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#FF4500] text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <IconHelpCircleOutline
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconHelpCircleOutline
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Help center
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#FF4500] text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <IconNewspaperOutline
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconNewspaperOutline
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Terms & Policies
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#FF4500] text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <IconMegaphone
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconMegaphone
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Advertise on Reddit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#FF4500] text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <IconLogout
                        className="mr-2 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <IconLogout
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Log In / Sign Up
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function IconMoonOutline(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
        />
      </svg>
    );
}


function IconHelpCircleOutline(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeMiterlimit={10}
          strokeWidth={32}
          d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={28}
          d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        />
        <path d="M270 348 A20 20 0 0 1 250 368 A20 20 0 0 1 230 348 A20 20 0 0 1 270 348 z" />
      </svg>
    );
}


function IconNewspaperOutline(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192"
        />
        <path d="M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z" />
      </svg>
    );
}

function IconMegaphone(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M13 2.5a1.5 1.5 0 013 0v11a1.5 1.5 0 01-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 015.51 15.1h-.548a1 1 0 01-.916-.599l-1.85-3.49a68.14 68.14 0 00-.202-.003A2.014 2.014 0 010 9V7a2.02 2.02 0 011.992-2.013 74.663 74.663 0 002.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 001 0v-11a.5.5 0 00-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 01-1.992.052A1.02 1.02 0 001 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 014 10.065zm-.657.975l1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 00-1.722-.082z" />
      </svg>
    );
}

function IconLogout(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
      </svg>
    );
}