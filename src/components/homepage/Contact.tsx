'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientText } from '@/components/TypewriterText'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const contactInfo = [
  {
    icon: '📍',
    title: 'Địa chỉ',
    details: ['123 Đường ABC, Quận XYZ', 'TP. Hồ Chí Minh'],
    color: 'from-sky-500 to-cyan-500'
  },
  {
    icon: '📞',
    title: 'Điện thoại',
    details: ['(028) 1234-5678', '0901-234-567'],
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: '🕒',
    title: 'Giờ mở cửa',
    details: ['T2 - CN: 8:00 - 20:00', 'Nghỉ lễ theo quy định'],
    color: 'from-blue-500 to-sky-500'
  }
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current
    const map = mapRef.current

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Cards animation with wave effect
    if (cards) {
      const cardElements = cards.children
      
      gsap.fromTo(cardElements, 
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationY: 45
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Continuous floating animation
      gsap.to(cardElements, {
        y: 'random(-10, 10)',
        duration: 'random(3, 5)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })

      // Hover animations for each card
      Array.from(cardElements).forEach((card: Element) => {
        const icon = card.querySelector('.contact-icon')
        const content = card.querySelector('.contact-content')
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.05,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            duration: 0.3,
            ease: 'power2.out'
          })
          
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
          
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            duration: 0.3,
            ease: 'power2.out'
          })
          
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }

    // Map animation
    if (map) {
      gsap.fromTo(map, 
        { opacity: 0, scale: 0.8, rotation: -5 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: map,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-white/50 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <GradientText>Liên hệ với chúng tôi</GradientText>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng phục vụ bạn với chất lượng tốt nhất
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Cards */}
          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-sky-300 cursor-pointer"
              >
                <div className={`contact-icon w-16 h-16 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <span className="text-2xl text-white">{info.icon}</span>
                </div>
                
                <div className="contact-content text-center">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors duration-300">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-slate-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div ref={mapRef} className="relative">
            <div className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Vị trí salon
              </h3>
              <div className="bg-white rounded-xl p-6 shadow-inner">
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-white">📍</span>
                    </div>
                    <p className="text-slate-600 font-medium">Bản đồ tương tác</p>
                    <p className="text-sm text-slate-500 mt-2">123 Đường ABC, Quận XYZ</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-300 font-medium">
                  Chỉ đường
                </button>
                <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-300 font-medium">
                  Gọi ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

