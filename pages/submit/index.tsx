import React from 'react'
import CreatePostContainer from '../../components/fullPages/Submit Page/components/createPostContainer.tsx/CreatePostContainer'
import Header from "../../components/globalComponents/Header/Header"
import HomePageLayout from '../../components/fullPages/Home/layouts/HomePageLayout'
// import { useSelector } from 'react-redux'

const index = () => {
  // const userRedux = useSelector((state:any) => state.user)
  return (
        <main
        className='w-full h-[93vh] mt-[7vh] bg-[#DAE0E6] flex justify-center items-start  px-3 space-x-3'
        >
          {/* <h1 onClick={() => console.log(userRedux)}> LOG userRedux </h1> */}
            <CreatePostContainer />
        
        </main>       
  )
}

export default index