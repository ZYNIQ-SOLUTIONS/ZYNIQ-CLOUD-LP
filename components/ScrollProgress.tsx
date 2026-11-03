'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / height) * 100
      setProgress(progress)
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-[9998]">
      <div
        className="h-full bg-zyniq-red transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
