import React from 'react'

type Props = {
    children: React.ReactNode
}

function DocumentsLayout({
    children
}: Props) {
  return (
    <div>
        {children}
    </div>
  )
}

export default DocumentsLayout