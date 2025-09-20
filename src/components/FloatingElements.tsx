'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
  amplitude?: number
}

export default function FloatingElement({ 
  children, 
  className = '',
  duration = 3,
  delay = 0,
  amplitude = 20
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    gsap.to(element, {
      y: -amplitude,
      duration: duration,
      delay: delay,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })

    return () => {
      gsap.killTweensOf(element)
    }
  }, [duration, delay, amplitude])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Parallax component
interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxElement({ 
  children, 
  className = '',
  speed = 0.5
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed
      gsap.set(element, { y: rate })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}


