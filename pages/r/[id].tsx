import React, {useEffect , useState} from 'react'
import { useRouter } from "next/router"
import SubredditPageLayout from '../../components/Layouts/SubredditPageLayout'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setSubreddit } from '../../redux/subredditSlice'


const SubredditHomePage = () => {
  const [subreddit, setSubreddit] = useState<any[]>([])
    
  
  const dispatch = useDispatch();
  const router = useRouter()
  const { id } = router.query
    
  const fetchSubreddit = async () => {
    
    const subredditRef = doc(db, "subreddits", id as string)
    const subredditDocSnap = await getDoc(subredditRef)
    setSubreddit([subredditDocSnap.data()])
    // console.log(subreddit);
    
 
    

    
    
  }


    useEffect(() => {
      if(router.isReady) {
        fetchSubreddit()
        
        

      }
    }, [router.isReady ])
    
  return (
    <SubredditPageLayout> 
      <main
        className='w-full h-[92vh] mt-[7vh] bg-gray-200 flex justify-between items-center'
      >
       
       <h1 onClick={() => console.log(subreddit)}> LOG </h1>

      </main>
    </SubredditPageLayout>
  )
}

export default SubredditHomePage