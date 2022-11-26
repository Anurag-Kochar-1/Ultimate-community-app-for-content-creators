import type { NextPage } from 'next'
import { useEffect, useState } from "react"
import HomePage from '../components/Full pages/HomePage/HomePage'
import Header from '../components/Header/Header'
import HomePageLayout from '../components/Layouts/HomePageLayout'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/slices/userSlice"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any[]>([])

  const [user] = useAuthState(auth)
  const dispatch = useDispatch()
  // const userRedux = useSelector((state:any) => state.user)
  const router = useRouter()
  
  const userRef = doc(db, "users" , user?.uid as string)
  
  async function fetchUserDetails  ()  {
      const userDocSnap = await getDoc(userRef)
      console.log(userDocSnap.data());
      
      
    }
    
  
  useEffect(() => {
    setHydrated(true)
    fetchUserDetails()
    
    
  },[auth])

  if(!hydrated) return null
  return (
    
    <HomePageLayout>
      <h1 className='mt-52 text-xl font-semibold' onClick={() => console.log(currentUser)}> LOG currentUser </h1>
      <HomePage />
    </HomePageLayout>
  )
}

export default Home
