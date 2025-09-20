'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { GradientText } from '@/components/TypewriterText'
import InteractiveButton from '@/components/InteractiveButton'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    const header = headerRef.current
    const logo = logoRef.current
    const nav = navRef.current
    const button = buttonRef.current

    // Initial animation
    const tl = gsap.timeline()
    
    tl.fromTo(logo, 
      { opacity: 0, x: -50, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo(nav?.children || [], 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.4'
    )
    .fromTo(button, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3'
    )

    // Scroll effect
    let lastScrollY = 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > 100) {
        gsap.to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          duration: 0.3
        })
      } else {
        gsap.to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          duration: 0.3
        })
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div ref={logoRef} className="flex items-center">
            <GradientText className="text-2xl font-bold">
              Salon Pro
            </GradientText>
          </div>
          
          <nav ref={navRef} className="hidden md:flex space-x-8">
            <Link 
              href="#services" 
              className="text-slate-600 hover:text-sky-600 transition-colors duration-300 font-medium relative group"
            >
              Dịch vụ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="#pricing" 
              className="text-slate-600 hover:text-sky-600 transition-colors duration-300 font-medium relative group"
            >
              Bảng giá
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="#contact" 
              className="text-slate-600 hover:text-sky-600 transition-colors duration-300 font-medium relative group"
            >
              Liên hệ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          <div ref={buttonRef}>
            <InteractiveButton href="/booking" variant="primary" size="md">
              Đặt lịch ngay
            </InteractiveButton>
          </div>
        </div>
      </div>
    </header>
  )
}

