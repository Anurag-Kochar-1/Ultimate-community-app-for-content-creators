import type { GetServerSideProps, NextPage } from 'next'
import { use, useEffect, useState } from "react"
import HomePage from "../components/fullPages/Home/full page/HomePage"
import Header from '../components/globalComponents/Header/Header'
import HomePageLayout from '../components/fullPages/Home/layouts/HomePageLayout'
import { useDispatch, useSelector } from "react-redux"
import { setUser, setUserJoinedCommunitiesData, setUserOwnedCommunitiesData, setUserCreatedPostsData } from "../redux/slices/userSlice"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore"
import { auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, getDocs , onSnapshot, where , query, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useRouter } from "next/router"
import { ICommunity } from '../customTypesAndInterfaces/communityInterfaces'
import Link from 'next/link'
import { wrapper } from '../redux/store'
import { IPost } from '../customTypesAndInterfaces/post'
import {setAllPosts} from "../redux/slices/postsSlice"
import { setAllCommunities } from "../redux/slices/communitySlice"


const Home: NextPage = ( props:any ) => {
  console.log(props);

  const [user, loading, error ] = useAuthState(auth)
  const dispatch = useDispatch()
  // ------ States ------
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [isSignInOrOutReminderVisible, setIsSignInOrOutReminderVisible] = useState<boolean>(false)

 // ----- Refs ------
  const postsCollectionRef = collection(db, "posts")
  const subbreditCollectionRef = collection(db, "subreddits")
  

  // -------- Fetching User Details --------  
  const fetchUserDetails = async () =>  {
    if( !loading ) {
      const userRef = doc(db, "users" , user?.uid as string)
      const userDocData = await getDoc(userRef)
      dispatch(setUser(userDocData.data()))

      getUserJoinedSubbredits()
      getUserOwnedSubreddits()
      getUserCreatedPosts()
    } else if (loading) {
      console.log(`fetchUserDetails ====> loading`);
    } else if (error) {
      console.log(`error occured while running fetchUserDetails`);
    }
  }

  // -------- User's Joined Subreddit Details --------  
  const getUserJoinedSubbredits = async () => {
    if(!loading && user) {
      const queryUser = query(subbreditCollectionRef, where("members" , "array-contains", user?.uid as string))
      
      const queryUserJoinedSubreddits = await getDocs(queryUser)
      dispatch(setUserJoinedCommunitiesData( queryUserJoinedSubreddits?.docs.map((doc) => ({...doc.data(), subredditID: doc.id})) ))

    }
  }

  // -------- User's Owned Subreddit Details -------- 
  const getUserOwnedSubreddits = async () => {
    if(!loading && user) {
      const ownedSubredditsQuery = query(subbreditCollectionRef, where("createrUserID" , "==", user?.uid as string))
      const ownedSubredditsData = await getDocs(ownedSubredditsQuery)
      dispatch(setUserOwnedCommunitiesData( ownedSubredditsData?.docs.map((doc) => ({...doc.data(), subredditID: doc.id})) ))
    }
  }

  // -------- User's Createad Posted Details -------- 
  const getUserCreatedPosts = async () => {
    if(!loading && user) {
      const createdPostsQuery = query(postsCollectionRef, where("creatorUserID", "==", user.uid as string))
      const createdPostsData = await getDocs(createdPostsQuery)
      dispatch(setUserCreatedPostsData(createdPostsData.docs.map((doc) => ({...doc.data(), postID: doc.id}) )))
    }
  }
  
  
  useEffect(() => {
    // setHydrated(true)
    
    if(user && !loading && !error) {
      fetchUserDetails()
    }

    dispatch(setAllCommunities(props.allCommunitiesDataArr))


    // if(user && isSignInOrOutReminderVisible === false) {
    //   setInterval(() => {
    //     console.log(`setInterval is running`);
        
    //     setIsSignInOrOutReminderVisible(true)
    //   }, 4000)
    // }

  },[user])

  // if(!hydrated) return null
  return (
    <>
      <HomePage />
      {/* {isSignInOrOutReminderVisible && <div className='fixed bottom-0 left-0 w-full h-[40vh] bg-brandColor z-30'>
        <button> Sign in </button>
        <button> Sign up </button>
        <button onClick={() => setIsSignInOrOutReminderVisible(false)}> No thanks </button>
      </div>} */}
    </>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(store => async({query}) =>  {
  let allCommunitiesDataArr:ICommunity[] = []
  const communityCollectionRef = collection(db, 'communities')
  const res = await getDocs(communityCollectionRef)
  res.forEach(doc => allCommunitiesDataArr.push(doc.data() as ICommunity))
  // store.dispatch(setAllCommunities( allCommunitiesDataArr ))
  
  
  // fetching all posts
  const allPostsDataArray:IPost[] = []
  const postsCollectionRef = collection(db, "posts")
  const postsData = await getDocs(postsCollectionRef)
  postsData.forEach((doc) => allPostsDataArray.push(doc.data() as IPost))
  
  store.dispatch(setAllPosts( allPostsDataArray ))
 
  return {
    props: {
      allCommunitiesDataArr: allCommunitiesDataArr
    }
  }
})