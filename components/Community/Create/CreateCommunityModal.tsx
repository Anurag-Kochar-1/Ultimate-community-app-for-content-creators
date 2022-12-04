import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaUserAlt , FaEye , FaLock } from 'react-icons/fa'
import { addDoc, collection, doc, setDoc , updateDoc , arrayUnion, arrayRemove } from "firebase/firestore"
import { auth, db } from '../../../firebaseConfig'
import { useRouter } from "next/router"

import { RadioGroup } from '@headlessui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

interface Props {
    openModal: () => void
    closeModal: () => void
    isCreateCommunityModalOpen: boolean
}

const types = [
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



export default function CreateCommunityModal ({isCreateCommunityModalOpen , openModal , closeModal}:Props) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [communityNameInput, setCommunityNameInput  ] = useState<string>('')
  const [communityType, setCommunityType] = useState(types[0])
  const [isAdultCommunityCheckboxChecked, setIsAdultCommunityCheckboxChecked] = useState<boolean>(false)
  
  const subredditsCollectionRef = collection(db, "subreddits")

  const userQuery = collection(db, `users/${user?.uid}/usersJoinedSubredditsSubCollection` )
  const [docs, loading, error] = useCollectionData(userQuery)
  
  
  const createSubreddit = async () => {

    // ------ creating subreddit ------
  const subredditDoc = await addDoc(subredditsCollectionRef, {
      subredditName : communityNameInput,
      communityType : communityType.name,
      isSubbreditNSFW : isAdultCommunityCheckboxChecked,
      category: null,
      about: "",
      logo: null,
      banner : null,
      customMemberName: "",
      creatorName : user?.displayName,
      creatorEmail : user?.email,
      creatorPhotoURL : user?.photoURL,
    
  })
  console.log(`subredditDoc ID : ${subredditDoc.id}`);
  

   // ------ updating user's sub collection ------
  const userJoinedSubredditsSubCollectionRef = collection(db, `users/${user?.uid as string}/userJoinedSubredditsSubCollection`);

  const addingToUserJoinedSubredditsSubCollection = await addDoc(userJoinedSubredditsSubCollectionRef, {
    subredditName : communityNameInput,
    subredditID : subredditDoc.id,
    isCurrentUserCreator : true
  })


  console.log(`addingToUserOwnedubredditsSubCollection ID : ${addingToUserJoinedSubredditsSubCollection.id}`)


    // ------ Reseting states ------
    closeModal()
    setCommunityNameInput("")
    setCommunityType(types[0])
    setIsAdultCommunityCheckboxChecked(false)
    router.push(`r/${subredditDoc.id}`)
  }



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
                <Dialog.Panel className="w-full max-w-xl h-[100vh] md:h-[70vh] lg:h-[70vh] xl:h-[65vh] transform overflow-y-scoll overflow-x-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg pb-2 font-medium leading-6 text-gray-900"
                  >
                    Create a community 
                  </Dialog.Title>

                  <hr />
                  
                  <div className="my-2">
                    <p className="text-normal font-normal text-black">
                      Name
                    </p>
                    <p className='text-gray-600 text-sm'>Community names including capitalization cannot be changed.</p>
                  </div>

                  <input
                    type="text"
                    placeholder='r/'
                    value={ communityNameInput }
                    onChange={(e) => communityNameInput.length < 21  && setCommunityNameInput(e.target.value)}
                    className=" outline-none border border-gray-200 rounded-md w-full py-2 px-2"
                    onKeyDown={(e) => {
                      if(communityNameInput.length >= 21 && e.key === 'Backspace') {
                        setCommunityNameInput(communityNameInput.slice(0, communityNameInput.length - 1))  
                      }
                    }}
                  />

                  <span className={communityNameInput.length >= 21 ? "text-red-700 text-xs" : "text-gray-500 text-xs"}> {21 - communityNameInput.length} Characters remaining </span>

                  {/* ---------------------------------- COMMUNITY TYPE ---------------------------------- */}
                  <div className="w-full px-1 py-4 pb-5">
                    <div className="w-full ">
                      <RadioGroup value={communityType} onChange={setCommunityType}> 
                        <RadioGroup.Label className="text-normal font-normal text-black"> Community Type</RadioGroup.Label>
                        <div className="space-y-2 pt-2 ">
                          {types.map((type) => (
                            <RadioGroup.Option
                              key={type.name}
                              value={type}
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
                                  <div className="flex w-full items-center justify-between">
                                    <div className="flex  items-center ">
                                      <div className="text-sm space-y-2 ">
                                        <RadioGroup.Label
                                          as="div"
                                          className={`w-[100%] font-medium flex justify-between items-center space-x-3 ${
                                            checked ? 'text-white' : 'text-gray-900'
                                          }`}
                                        >
                                          {type.icon}
                                          <p className='text-normal font-medium'> {type.name} </p>
                                          <p className={checked ? 'flex-1 text-xs text-white' : 'flex-1 text-xs text-gray-500'} > {type.description} </p>
                                          
                                        </RadioGroup.Label>
                                      </div>

                                    </div>
                                    {checked && (
                                      <div className="shrink-0 z-20 text-white">
                                        <CheckIcon className="h-5 w-5" />
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
                  {/* ---------------------------------- COMMUNITY TYPE ---------------------------------- */}


                  <div className='flex flex-col mb-7'>
                     <span onClick={() => console.log(isAdultCommunityCheckboxChecked)}
                      className="text-normal font-normal text-black py-2"
                     > Adult Content </span>
                    <div className='flex space-x-2'>
                      <input 
                        type="checkbox" 
                        id="AdultContentCheckbox"
                        name="AdultContentCheckbox" 
                        onClick={() => setIsAdultCommunityCheckboxChecked(isAdultCommunityCheckboxChecked ? false : true )}

                        
                        />  
                      <span className='bg-red-500 rounded-md text-xs px-2 py-1 text-white'> NSFW </span>
                      <label htmlFor="AdultContentCheckbox" className="select-none text-sm font-normal text-gray-700"> 18+ year old community </label> 
                    </div>
                  </div>

                  <div className="mt-4 w-full bg-white pt-2 pb-4 flex justify-end items-center space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-[#0079D3] bg-none px-4 py-2 text-sm font-medium text-[#0079D3] outline-none"
                      onClick={() => {
                        closeModal()
                        setCommunityNameInput("")
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full bg-[#0079D3] px-4 py-2 text-sm font-medium text-white outline-none"
                      onClick={() => {
                        createSubreddit()
                      }}
                    >
                      Create Community
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



/* ---- Process -----

  1. creating a subreddit doc inside subreddits collection
  2. adding subreddit ID to the current user's subredditsJoinedID and subredditsOwnedID


*/