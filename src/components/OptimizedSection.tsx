'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useOptimizedGSAP } from '@/hooks/useOptimizedGSAP'

interface OptimizedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'stagger'
  delay?: number
  duration?: number
  skipOnMobile?: boolean
}

export default function OptimizedSection({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  duration,
  skipOnMobile = false
}: OptimizedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { createOptimizedAnimation, getScrollTriggerSettings, shouldReduceMotion, isLowPerformance } = useOptimizedGSAP({
    isMobile,
    reduceMotion: false
  })

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
    if (!sectionRef.current || (skipOnMobile && isMobile)) return

    const element = sectionRef.current
    const children = element.children
    const settings = getScrollTriggerSettings(element.id || 'section', 'top 80%')

    // Set initial state based on animation type
    const initialStates = {
      fadeInUp: { opacity: 0, y: 30 },
      fadeInLeft: { opacity: 0, x: -30 },
      fadeInRight: { opacity: 0, x: 30 },
      scaleIn: { opacity: 0, scale: 0.9 },
      stagger: { opacity: 0, y: 20 }
    }

    const finalStates = {
      fadeInUp: { opacity: 1, y: 0 },
      fadeInLeft: { opacity: 1, x: 0 },
      fadeInRight: { opacity: 1, x: 0 },
      scaleIn: { opacity: 1, scale: 1 },
      stagger: { opacity: 1, y: 0 }
    }

    if (animation === 'stagger') {
      gsap.set(children, initialStates.stagger)
      createOptimizedAnimation(
        children,
        {},
        finalStates.stagger,
        { 
          scrollTrigger: settings,
          stagger: 0.1
        }
      )
    } else {
      gsap.set(element, initialStates[animation])
      createOptimizedAnimation(
        element,
        {},
        finalStates[animation],
        { scrollTrigger: settings }
      )
    }

    return () => {
      gsap.killTweensOf(element)
      gsap.killTweensOf(children)
    }
  }, [animation, delay, duration, createOptimizedAnimation, getScrollTriggerSettings, isMobile, skipOnMobile])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
