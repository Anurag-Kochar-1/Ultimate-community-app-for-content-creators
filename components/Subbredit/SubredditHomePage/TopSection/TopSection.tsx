import Image from 'next/image'
import React from 'react'
import subredditDefaultLogo from "../../../../public/images/subredditDefaultLogo.png"
import subredditDefaultBanner from "../../../../public/images/subredditDefaultBanner.png"
import {BsBellFill , BsBellSlashFill , BsBell } from "react-icons/bs"
import { useSelector } from "react-redux"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
const TopSection = () => {
    const [user, loading] = useAuthState(auth)
    const {subredditData} = useSelector((state:any) => state.subreddit)

    
    
    
    
    const addMember = async () => {
        const subredditRef = doc(db, "subreddits" , subredditData?.subredditID)
        console.log(`adding to ${subredditData?.subredditID}`);
        if(!loading && user) {
            // console.log(user);
            try {
                await updateDoc(subredditRef, {
                    members: arrayUnion(user?.uid)
                })
            } catch (error) {
             console.log(error);
                
            }
            
        }
    }

    const updateUser = async() => {
        if(!loading && user) {
            const userRef = doc(db, "users" , user?.uid)
            try {
                await updateDoc(userRef, {
                    subredditsJoinedID: arrayUnion(subredditData?.subredditID)
                })
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    

  return (
    <div
        className='w-full h-[25vh] bg-red-600  flex flex-col items-center justify-end'
    >
        <Image src={subredditDefaultBanner} alt="logo" className='w-full h-full ' />

        <div className='w-full flex justify-between items-center bg-gray-100  px-3 py-1'>

            <div className='flex flex-col md:flex-row justify-start items-start md:items-center bg-transparent space-y-1 md:space-x-1'>

                <Image src={subredditDefaultLogo} width={12} height={12} alt="logo" className='h-12 w-12 rounded-full aspect-square box-border border-2 border-white' />
                <h1 onClick={() => console.log(subredditData)} className='text-sm font-bold'> r/{subredditData?.subredditName} </h1>

            </div>

            <div className='flex justify-between items-center'>
                <button 
                    type='button' 
                    className='bg-[#0079D3] text-white text-sm hover:cursor-pointer rounded-full px-4 py-1'
                    onClick={() => {
                        addMember()
                        updateUser()
                    }}
                    > Join </button>

            </div>
        </div>

    </div>
  )
}

export default TopSection