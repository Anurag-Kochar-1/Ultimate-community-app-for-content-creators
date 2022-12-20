import {useEffect, useState} from 'react'
import { collection, doc, DocumentData, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import CreatePostContainer from '../../components/globalComponents/CreatePostContainer/largeScreen/LargeScreenCreatePostContainer'
import SmallScreenCreatePostContainer from '../../components/globalComponents/CreatePostContainer/smallScreen/SmallScreenCreatePostContainer'
import { auth, db } from '../../firebaseConfig'
import { ICommunityData } from '../../customTypesAndInterfaces/communityInterfaces'
// import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { setUserJoinedCommunitiesData } from "../../redux/slices/userSlice"
import { useRouter } from 'next/router'

const index = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [user, loading] = useAuthState(auth)
  const [userJoinedCommunitiesState, setUserJoinedCommunitiesState] = useState<ICommunityData[] | []>([])
  
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunityData | null>(null)
  const communityCollectionRef = collection(db, "communities")
  
  // fetching user's joined and owned commninties 
  const fetchUserJoinedAndOwnedCommunities = async () => {
      const userJoinedCommunitiesArray:any[] = []
      const queryUser = query(communityCollectionRef, where("members", "array-contains", user?.uid)) 
      const queryData = await getDocs(queryUser)
      queryData.forEach((doc) => { 
        userJoinedCommunitiesArray.push(doc.data())
      })
      setUserJoinedCommunitiesState(queryData.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));  
      
  }

  useEffect(() => {
    if(!loading && user) {
      fetchUserJoinedAndOwnedCommunities()
    }

    if(!auth.currentUser && !loading ) {
      router.push('/')
    }

  },[user])

  
  return (
    <div className='w-full h-[94vh] lg:h-[94vh] mt-[7vh] mb-[9vh] lg:mb-0 overflow-x-hidden overflow-y-scroll bg-lightColor flex flex-col justify-start md:justify-start items-center px-3 space-y-3 md:space-y-7 lg:space-y-10'>



      <CreatePostContainer  
        selectedCommunity={selectedCommunity}
        setSelectedCommunity={setSelectedCommunity}
        userJoinedCommunitiesState={userJoinedCommunitiesState} 
      />

      <SmallScreenCreatePostContainer 
      selectedCommunity={selectedCommunity}
      setSelectedCommunity={setSelectedCommunity}
      userJoinedCommunitiesState={userJoinedCommunitiesState} 
      />



    </div>
  )
}

export default index


