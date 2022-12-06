import type { NextPage } from 'next'
import { use, useEffect, useState } from "react"
import HomePage from '../components/Full pages/HomePage/HomePage'
import Header from '../components/Header/Header'
import HomePageLayout from '../components/Layouts/HomePageLayout'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/slices/userSlice"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore"
import { auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, getDocs , onSnapshot, where , query, Query } from 'firebase/firestore'
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const [user, loading, error ] = useAuthState(auth)
  const dispatch = useDispatch()
  
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any[]>([])
  const [usersJoinedSubredditsSubCollection, setUsersJoinedSubredditsSubCollection] = useState<any>([])
  
  const queryUserJoinedSubreddits = collection(db, `users/${user?.uid}/usersJoinedSubredditsSubCollection` )
  // const [docs] = useCollectionData(queryUserJoinedSubreddits)
  const postsCollectionRef = collection(db, "posts")
  const subbreditCollectionRef = collection(db, "subreddits")
  
  const fetchUserDetails = async () =>  {
    if( !loading ) {
      const userRef = doc(db, "users" , user?.uid as string)
      const userDocSnap = await getDoc(userRef)
      dispatch(setUser(userDocSnap.data()))
      setCurrentUser([userDocSnap.data()])
    } else if (loading) {
      console.log(`fetchUserDetails => loading`);
    } else if (error) {
      console.log(`error occured while running fetchUserDetails`);
      
    }
  }

  

  const queryUserCreatedPost = async () => {
    if(!loading) {
      const q = query(postsCollectionRef, where("creatorUserID" , "==" , user?.uid as string))
    
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      });
    }
    
  }


  const fetchUserJoinedSubbredit = async () => {
    if(!loading && user) {
      const queryUser = query(subbreditCollectionRef, where("members" , "array-contains", user?.uid as string))
      
      const queryUserJoinedSubreddits = await getDocs(queryUser)
      queryUserJoinedSubreddits.forEach((doc) => {
        console.log(doc.data());
        
      })
    }
    
  }
  
  
  useEffect(() => {
    // console.log(`----------------useEffect is running-----------------`);
    setHydrated(true)
    
    if(user) {
      fetchUserDetails()
    }
    // setUsersJoinedSubredditsSubCollection([docs])

    // queryUserCreatedPost()
    fetchUserJoinedSubbredit()

  },[user ])

  if(!hydrated) return null
  return (
    
    <HomePageLayout>
      <h1 className='mt-20 text-xl font-semibold' onClick={() => {
        // console.log(currentUser[0]?.subredditsOwnedID[0])
        console.log(currentUser)

      }} > LOG currentUserState </h1>

      <h1 className='mt-20 text-xl font-semibold' onClick={() => {
        console.log(usersJoinedSubredditsSubCollection)
      }} > LOG usersJoinedSubredditsSubCollection </h1>

      <h1 className='mt-20 text-xl font-semibold' onClick={() => {
        console.log(1)
      }} > LOG docs </h1>

      {/* {docs && docs.map((doc) => (
        <p> {doc.subredditID} </p>
      ))} */}
        
      {!loading && <HomePage />}
      {loading && <h1 className='text-6xl font-bold'> LOADING.............................. </h1>}
    </HomePageLayout>
  )
}

export default Home
