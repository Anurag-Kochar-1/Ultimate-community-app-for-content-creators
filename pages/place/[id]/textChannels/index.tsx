import React from 'react'
import { useRouter } from 'next/router'


const index = () => {
    const router = useRouter()
    const {id} = router.query

  return (
    <div className='w-full h-screen py-20 bg-red-300'>
        <h1 onClick={() => console.log(router)}> TEXT CHANNEL INDEX PAGE </h1>
    </div>
  )
}

export default index