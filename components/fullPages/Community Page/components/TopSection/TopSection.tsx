import Image from 'next/image'
import {useState} from 'react'
import communityDefaultLogo from "../../../../../public/images/communityDefaultLogo.png"
import communityDefaultBanner from "../../../../../public/images/communityDefaultBanner.png"
import {BsBellFill , BsBellSlashFill , BsBell,BsGearFill } from "react-icons/bs"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../../../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
// import { AppState } from '../../../../../redux/store'
import { ICommunityData , ICommunity} from '../../../../../customTypesAndInterfaces/communityInterfaces'
import { IAllSlicesState } from "../../../../../customTypesAndInterfaces/allSlicesState"

const TopSection = () => {
    const [user, loading] = useAuthState(auth)
    const communityData:ICommunityData = useSelector((state:IAllSlicesState) => state.community.communityData);

    const [isFullCommunityDescriptionOpen, setIsFullCommunityDescriptionOpen] = useState<boolean>(false)
    
    // const addMember = async () => {
    //     const subredditRef = doc(db, "subreddits" , communityData?.subredditID)
    //     console.log(`adding to ${communityData?.subredditID}`);
    //     if(!loading && user) {
    //         // console.log(user);
    //         try {
    //             await updateDoc(subredditRef, {
    //                 members: arrayUnion(user?.uid)
    //             })
    //         } catch (error) {
    //          console.log(error);
                
    //         }
            
    //     }
    // }

    // const updateUser = async() => {
    //     if(!loading && user) {
    //         const userRef = doc(db, "users" , user?.uid)
    //         try {
    //             await updateDoc(userRef, {
    //                 subredditsJoinedID: arrayUnion(communityData?.subredditID)
    //             })
    //         } catch (error) {
    //             console.log(error);
                
    //         }
    //     }
    // }

    

  return (
    <div className='w-full flex flex-col items-center justify-start bg-orange-700  pb-2'>
      {/* Banner and Logo */}
        <div className='w-full bg-gray-500 relative'>
            <Image src={communityDefaultBanner} alt="banner" className='w-full h-[15vh]'/>
            <Image src={communityDefaultLogo}  alt="banner" className='w-12 h-12 border border-lightColor rounded-full aspect-square absolute left-2 -bottom-2'/>

        </div>

        {/* Detials */}
        <section className='w-full bg-lightColor pt-3 px-2 flex flex-col justify-between items-center space-y-2'>
            {/* Name and button */}
           <div className='w-full flex justify-between items-center '>
            <h1 className='text-base font-medium text-darkColor' onClick={() => console.log(communityData)}> {communityData?.communityName} </h1>

            {/* <BsGearFill className='flex-1 w-6 h-6 text-darkColor' /> */}
            <button 
            type='button' 
            className='bg-brandColor text-xs font-medium px-3 py-1 text-lightColor font-poppins'>
                Join
            </button>
           </div>

           {/* total Members and online members */}
           <div className='w-full flex justify-start items-center space-x-2'>
                <p className='text-darkColor opacity-85 text-xs font-poppins font-light'> {communityData?.members?.length} members </p>
                <p className='text-darkColor opacity-85 text-xs font-poppins font-light'> {communityData?.members?.length} online </p>
           </div>

           {/* Community Description */}
           <div
            className='w-full flex justify-start items-center space-x-2 hover:cursor-pointer' 
            onClick={() => isFullCommunityDescriptionOpen ? setIsFullCommunityDescriptionOpen(false) : setIsFullCommunityDescriptionOpen(true)}>

            {!isFullCommunityDescriptionOpen && <p className='text-dark opacity-70 font-normal font-poppins text-xs '> {communityData?.communityDescription?.slice(0,130)}... </p>}
            {isFullCommunityDescriptionOpen && <p className='text-dark font-normal font-poppins text-xs pb-5'> {communityData?.communityDescription} </p>}

                
           </div>
        </section>

    </div>
  )
}

export default TopSection