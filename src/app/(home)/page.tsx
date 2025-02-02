
'use client'
import React from 'react'
import { Navbar } from './navbar'
import { TemplatesGallery } from './templates-gallery'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

type Props = {}

function Home({}: Props) {
  const documents = useQuery(api.documents.get)
  
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed inset-x-0 top-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        {
          documents?.map((doc) => (
            <span key={doc?._id}>
              {
                doc?.title
              }
            </span>
          ))
        }
      </div>
    </div>
  )
}

export default Home