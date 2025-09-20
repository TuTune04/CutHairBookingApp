'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile and disable cursor on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip cursor on mobile devices
    if (isMobile) return

    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let rafId: number

    // Throttled cursor update
    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Use transform instead of GSAP for better performance
      cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`
    }

    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1

      follower.style.transform = `translate3d(${followerX - 12}px, ${followerY - 12}px, 0)`
      rafId = requestAnimationFrame(updateFollower)
    }

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 })
      gsap.to(follower, { scale: 0.5, duration: 0.2 })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 })
      gsap.to(follower, { scale: 1, duration: 0.2 })
    }

    // Add event listeners with passive option
    document.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    updateFollower()

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isMobile])

  // Don't render cursor on mobile
  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-sky-500 rounded-full pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
      <div
        ref={followerRef}
        className="fixed w-6 h-6 border-2 border-sky-500/30 rounded-full pointer-events-none z-50 will-change-transform"
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      />
    </>
  )
}

