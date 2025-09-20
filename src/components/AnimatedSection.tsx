'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'stagger'
  delay?: number
  duration?: number
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  duration = 1
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const element = sectionRef.current
    const children = element.children

    // Set initial state based on animation type
    gsap.set(element, { opacity: 0 })

    switch (animation) {
      case 'fadeInUp':
        gsap.set(element, { y: 50 })
        break
      case 'fadeInLeft':
        gsap.set(element, { x: -50 })
        break
      case 'fadeInRight':
        gsap.set(element, { x: 50 })
        break
      case 'scaleIn':
        gsap.set(element, { scale: 0.8 })
        break
      case 'stagger':
        gsap.set(children, { opacity: 0, y: 30 })
        break
    }

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    if (animation === 'stagger') {
      tl.to(element, { opacity: 1, duration: 0.1 })
        .to(children, { 
          opacity: 1, 
          y: 0, 
          duration, 
          stagger: 0.2,
          ease: 'power2.out'
        }, delay)
    } else {
      tl.to(element, { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1,
        duration,
        delay,
        ease: 'power2.out'
      })
    }

    return () => {
      tl.kill()
    }
  }, [animation, delay, duration])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}


