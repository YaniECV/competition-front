'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Loader = dynamic(() => import('./Loader'), { ssr: false })

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('loader-done')) {
      setShowLoader(true)
    } else {
      setLoaderDone(true)
    }
  }, [])

  return (
    <>
      {showLoader && (
        <Loader onDone={() => { setShowLoader(false); setLoaderDone(true) }} />
      )}
      <div style={{ opacity: loaderDone ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        {children}
      </div>
    </>
  )
}
