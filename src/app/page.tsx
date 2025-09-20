'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollProgress from '@/components/ScrollProgress'
import CustomCursor from '@/components/CustomCursor'
import PerformanceMonitor from '@/components/PerformanceMonitor'
import { Header, Hero, Services, Pricing, Contact, Footer } from '@/types'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Global page entrance animation
    gsap.fromTo('body', 
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <PerformanceMonitor />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <Hero />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
