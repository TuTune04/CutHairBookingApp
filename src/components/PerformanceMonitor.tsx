'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
  isLowPerformance: boolean
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 100,
    memoryUsage: 0,
    renderTime: 0,
    isLowPerformance: false
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        // Get memory usage if available
        const memoryUsage = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
          : 0

        // Measure render time
        const renderStart = performance.now()
        requestAnimationFrame(() => {
          const renderTime = performance.now() - renderStart
          
          setMetrics({
            fps,
            memoryUsage,
            renderTime: Math.round(renderTime * 100) / 100,
            isLowPerformance: fps < 30 || memoryUsage > 100
          })
        })

        frameCount = 0
        lastTime = currentTime
      }

      rafId = requestAnimationFrame(measurePerformance)
    }

    measurePerformance()

    // Keyboard shortcut to toggle visibility (Ctrl + Shift + P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development' || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">Performance Monitor</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className={`flex justify-between ${metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
          <span>FPS:</span>
          <span>{metrics.fps}</span>
        </div>
        
        <div className={`flex justify-between ${metrics.memoryUsage > 100 ? 'text-red-400' : metrics.memoryUsage > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
          <span>Memory:</span>
          <span>{metrics.memoryUsage}MB</span>
        </div>
        
        <div className={`flex justify-between ${metrics.renderTime > 16 ? 'text-red-400' : metrics.renderTime > 8 ? 'text-yellow-400' : 'text-green-400'}`}>
          <span>Render:</span>
          <span>{metrics.renderTime}ms</span>
        </div>
        
        {metrics.isLowPerformance && (
          <div className="text-red-400 text-center mt-2">
            ⚠️ Low Performance
          </div>
        )}
      </div>
      
      <div className="text-gray-400 text-center mt-2 text-xs">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  )
}
