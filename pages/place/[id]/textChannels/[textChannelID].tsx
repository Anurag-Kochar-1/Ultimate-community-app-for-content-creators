import { useRouter } from 'next/router'
import React from 'react'
import CommunityLayout from '../../../../components/fullPages/Community Page/layout/CommunityLayout'

const textChannelID = () => {
    const router = useRouter()
    const {textChannelID} = router.query

  return (
    <CommunityLayout>
        <main className='w-[100%] bg-yellow-400 flex flex-col justify-start items-center overflow-x-hidden overflow-y-scroll space-y-3 '>
        <h1 onClick={() => console.log(router)}> BY DEFAULY TEXT CHANNEL - ID : {textChannelID} </h1>
        </main>
    </CommunityLayout>
  )
}

export default textChannelID