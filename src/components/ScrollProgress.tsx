'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    let rafId: number
    let ticking = false

    const updateProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100)

      // Use direct style manipulation for better performance
      progress.style.width = `${scrollPercent}%`
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Hide on mobile to save performance
  if (isMobile) return null

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/30 z-50">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 shadow-lg will-change-transform"
        style={{ width: '0%' }}
      />
    </div>
  )
}


