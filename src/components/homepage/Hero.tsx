'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { GradientText } from '@/components/TypewriterText'
import InteractiveButton from '@/components/InteractiveButton'
import FloatingElement from '@/components/FloatingElements'
import { useOptimizedGSAP } from '@/hooks/useOptimizedGSAP'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  const { createOptimizedAnimation, getAnimationSettings, shouldReduceMotion, isLowPerformance } = useOptimizedGSAP({
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

  useGSAP(() => {
    if (!heroRef.current) return

    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const button = buttonRef.current
    const background = backgroundRef.current
    const settings = getAnimationSettings()

    const ctx = gsap.context(() => {
      // Skip complex animations on low-performance devices
      if (settings.skipComplexAnimations) {
        // Simple fade-in animation
        gsap.fromTo([title, subtitle, button], 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        )
        return
      }

      // Background elements animation (simplified for mobile)
      if (background && !isMobile) {
        createOptimizedAnimation(
          background.children,
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
          }
        )
      }

      // Main content animation
      const masterTl = gsap.timeline()
      
      masterTl
        .fromTo(title, 
          { opacity: 0, y: 50, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: settings.duration * 1.5, 
            ease: settings.ease
          }
        )
        .fromTo(subtitle, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: settings.duration, 
            ease: settings.ease
          }, '-=0.5'
        )
        .fromTo(button, 
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1,
            duration: settings.duration, 
            ease: 'back.out(1.2)'
          }, '-=0.3'
        )

      // Simplified floating animation for background elements (only on desktop)
      if (background && !isMobile && !settings.skipComplexAnimations) {
        gsap.to(background.children, {
          y: 'random(-10, 10)',
          x: 'random(-5, 5)',
          duration: 'random(4, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        })
      }

      // Simplified parallax effect (only on desktop)
      if (!isMobile && !settings.skipComplexAnimations) {
        gsap.to(hero, {
          scrollTrigger: {
            start: 'top top',
            end: 'bottom top',
            scrub: 0.1
          },
          y: (i, target) => -window.innerHeight * 0.3,
          ease: 'none'
        })
      }
    }, heroRef) // <- scope all your animations to the heroRef

    return () => ctx.revert() // cleanup
  }, {
    dependencies: [isMobile, createOptimizedAnimation, getAnimationSettings, shouldReduceMotion, isLowPerformance],
    scope: heroRef // <- this helps GSAP handle context cleanup
  })

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
    >
      {/* Animated Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 -z-10">
        <FloatingElement className="absolute top-20 left-10 w-20 h-20 bg-sky-200/30 rounded-full">
          <div className="w-full h-full bg-gradient-to-br from-sky-300/40 to-cyan-300/40 rounded-full"></div>
        </FloatingElement>
        <FloatingElement className="absolute top-40 right-20 w-16 h-16 bg-cyan-200/30 rounded-full" delay={1}>
          <div className="w-full h-full bg-gradient-to-br from-cyan-300/40 to-blue-300/40 rounded-full"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-200/30 rounded-full" delay={2}>
          <div className="w-full h-full bg-gradient-to-br from-blue-300/40 to-sky-300/40 rounded-full"></div>
        </FloatingElement>
        <FloatingElement className="absolute top-1/2 right-1/3 w-8 h-8 bg-sky-300/20 rounded-full" delay={3}>
          <div className="w-full h-full bg-gradient-to-br from-sky-400/30 to-cyan-400/30 rounded-full"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-1/3 right-10 w-14 h-14 bg-cyan-300/20 rounded-full" delay={4}>
          <div className="w-full h-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full"></div>
        </FloatingElement>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
        >
          <GradientText className="text-4xl md:text-6xl lg:text-7xl">
            Salon Chuyên Nghiệp
          </GradientText>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Trải nghiệm dịch vụ cắt tóc, tạo kiểu và chăm sóc tóc chuyên nghiệp 
          với đội ngũ thợ tóc giàu kinh nghiệm và không gian hiện đại.
        </p>
        
        <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <InteractiveButton href="/booking" variant="primary" size="lg">
            Đặt lịch ngay
          </InteractiveButton>
          <InteractiveButton href="#services" variant="outline" size="lg">
            Khám phá dịch vụ
          </InteractiveButton>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sky-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sky-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

