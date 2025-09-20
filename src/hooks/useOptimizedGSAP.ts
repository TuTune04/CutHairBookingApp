'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface OptimizedGSAPOptions {
  reduceMotion?: boolean
  isMobile?: boolean
  performanceMode?: 'high' | 'medium' | 'low'
}

export function useOptimizedGSAP(options: OptimizedGSAPOptions = {}) {
  const { reduceMotion = false, isMobile = false, performanceMode = 'medium' } = options
  
  // Detect user preferences
  const prefersReducedMotion = useRef(false)
  const isLowEndDevice = useRef(false)
  
  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Detect low-end devices
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      isLowEndDevice.current = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
    }
  }, [])

  // Optimized animation settings based on device and preferences
  const getAnimationSettings = useCallback(() => {
    const shouldReduceMotion = reduceMotion || prefersReducedMotion.current
    const isLowPerformance = isMobile || isLowEndDevice.current || performanceMode === 'low'
    
    if (shouldReduceMotion) {
      return {
        duration: 0.1,
        ease: 'none',
        stagger: 0,
        skipAnimations: true
      }
    }
    
    if (isLowPerformance) {
      return {
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.1,
        skipComplexAnimations: true
      }
    }
    
    return {
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
      skipComplexAnimations: false
    }
  }, [reduceMotion, isMobile, performanceMode])

  // Optimized ScrollTrigger settings
  const getScrollTriggerSettings = useCallback((trigger: string, start: string = 'top 80%') => {
    const settings = getAnimationSettings()
    
    if (settings.skipAnimations) {
      return null
    }
    
    return {
      trigger,
      start,
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      // Reduce refresh rate for better performance
      refreshPriority: isMobile ? -1 : 0,
      // Use transform3d for hardware acceleration
      fastScrollEnd: true
    }
  }, [getAnimationSettings, isMobile])

  // Optimized animation function
  const createOptimizedAnimation = useCallback((
    targets: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    options: { scrollTrigger?: any; stagger?: number } = {}
  ) => {
    const settings = getAnimationSettings()
    
    if (settings.skipAnimations) {
      // Just set final state
      gsap.set(targets, toVars)
      return null
    }
    
    const animationVars = {
      ...toVars,
      duration: settings.duration,
      ease: settings.ease,
      stagger: options.stagger || settings.stagger,
      // Force hardware acceleration
      force3D: true,
      // Optimize for performance
      lazy: false
    }
    
    if (options.scrollTrigger) {
      animationVars.scrollTrigger = options.scrollTrigger
    }
    
    return gsap.fromTo(targets, fromVars, animationVars)
  }, [getAnimationSettings])

  // Cleanup function
  const cleanup = useCallback(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    gsap.killTweensOf('*')
  }, [])

  return {
    createOptimizedAnimation,
    getScrollTriggerSettings,
    getAnimationSettings,
    cleanup,
    shouldReduceMotion: reduceMotion || prefersReducedMotion.current,
    isLowPerformance: isMobile || isLowEndDevice.current
  }
}
