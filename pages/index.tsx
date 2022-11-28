import type { NextPage } from 'next'
import { useEffect, useState } from "react"
import HomePage from '../components/Full pages/HomePage/HomePage'
import Header from '../components/Header/Header'
import HomePageLayout from '../components/Layouts/HomePageLayout'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/slices/userSlice"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from "react-firebase-hooks/firestore"
import { auth, db } from '../firebaseConfig'
import { collection, doc, Firestore, getDoc, getDocs , getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const [user, error, loading] = useAuthState(auth)
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any[]>([])
  // const [allUsers, setAllUsers] = useState<any[]>([])

  const dispatch = useDispatch()
  // const userRedux = useSelector((state:any) => state.user)
  const router = useRouter()
  
  
   const fetchUserDetails = async () =>  {
    if(db && user) {
      const userRef = doc(db, "users" , user?.uid as string)
      const userDocSnap = await getDoc(userRef)
      // console.log(userDocSnap.data());
      dispatch(setUser(userDocSnap.data()))
      setCurrentUser([userDocSnap.data()])
    } else if(!db) {
      console.log(`no db`);
      
    }
  }


    
    // const getUsers = async () => {
    //   const querySnapshot = await getDocs(collection(db, "users"))
    //   setAllUsers(querySnapshot && querySnapshot.docs.filter((user2) => { 
    //       // return user2.id == user?.uid ? dispatch(setUser([user2.data()])) : null
    //       return user2.id == user?.uid ? setAllUsers([user2.data()]) : null
    //   }))

    //   // setAllUsers(querySnapshot && querySnapshot.docs.map((user2) => { 
    //   //     return {
    //   //           id: user2.id,
    //   //           data: {
    //   //             ...user2?.data()
    //   //           }
    //   //         }
    //   // })) 
    // }

  
  useEffect(() => {
    setHydrated(true)
    fetchUserDetails()
    // if(currentUser) dispatch(setUser(currentUser))
    // if(user) getUsers()
  },[])

  if(!hydrated) return null
  return (
    
    <HomePageLayout>
      <h1 className='mt-20 text-xl font-semibold' onClick={() => {console.log(currentUser)}}> LOG currentUser </h1>
        
      
      <HomePage />
    </HomePageLayout>
  )
}

export default Home
