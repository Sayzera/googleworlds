'use client'
import { Authenticated } from 'convex/react'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function DocsLayout({children}: Props) {
  return (
    <Authenticated>
        {children}
    </Authenticated>
  )
}

export default DocsLayout