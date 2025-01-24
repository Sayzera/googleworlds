
import React from 'react'
import { Navbar } from './navbar'
import { SearchInput } from './search-input'

type Props = {}

function Home({}: Props) {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed inset-x-0 top-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        Click
      </div>
    </div>
  )
}

export default Home