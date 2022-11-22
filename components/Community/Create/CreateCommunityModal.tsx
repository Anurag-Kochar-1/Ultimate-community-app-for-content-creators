import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaUserAlt , FaEye , FaLock } from 'react-icons/fa'

interface Props {
    openModal: () => void
    closeModal: () => void
    isCreateCommunityModalOpen: boolean
}

export default function CreateCommunityModal ({isCreateCommunityModalOpen , openModal , closeModal}:Props) {

  const [communityNameInput, setCommunityNameInput  ] = useState<string>('')
  
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl h-[60vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a community
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      Name
                    </p>
                    <p>Community names including capitalization cannot be changed.</p>
                  </div>

                  <input
                    type="text"
                    placeholder='r/'
                    value={ communityNameInput }
                    onChange={(e) => communityNameInput.length < 21 && setCommunityNameInput(e.target.value)}
                    className=" outline-none border border-gray-200 rounded-md w-full py-2 px-2"
                  />

                  <span className={communityNameInput.length >= 21 ? "text-red-700" : "text-gray-500"}> {communityNameInput.length} Characters remaining </span>

                  <CommunityTypeRadio />


                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
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


import { RadioGroup } from '@headlessui/react'

const plans = [
  {
    name: 'Public',
    description: 'Anyone can view, post, and comment to this community',
    icon: <FaUserAlt />
  },
  {
    name: 'Restricted',
    description: 'Anyone can view this community, but only approved users can post',
    icon: <FaEye />
  },
  {
    name: 'Private',
    description: 'Only approved users can view and submit to this community',
    icon: <FaLock />
  },
]

export function CommunityTypeRadio() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="w-full px-1 py-4">
      <div className="w-full ">
        <RadioGroup value={selected} onChange={setSelected}> 
          <RadioGroup.Label className="font-normal text-base">Community Type</RadioGroup.Label>
          <div className="space-y-2 pt-2 ">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-[#0079D3] bg-opacity-75 text-white' : 'bg-white'
                  }
                   w-full  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between bg-red-400">
                      <div className="flex  items-center bg-green-400">
                        <div className="text-sm space-y-2 ">
                          <RadioGroup.Label
                            as="div"
                            className={`w-[40%] font-medium flex justify-start items-center space-x-2 ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.icon}
                            <p> {plan.name} </p>
                          </RadioGroup.Label>

                          <RadioGroup.Description
                            as="span"
                            className={`inline-block ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span className='text-sm'>
                              {plan.description}
                            </span>

                            
                           
                          </RadioGroup.Description>
                        </div>

                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon(props:any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
