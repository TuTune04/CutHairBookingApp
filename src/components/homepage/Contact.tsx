'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { GradientText } from '@/components/TypewriterText'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const contactInfo = [
  {
    icon: '📍',
    title: 'Địa chỉ',
    details: ['123 Đường ABC, Quận XYZ', 'TP. Hồ Chí Minh'],
    color: 'from-sky-500 to-cyan-500',
    delay: 0
  },
  {
    icon: '📞',
    title: 'Điện thoại',
    details: ['(028) 1234-5678', '0901-234-567'],
    color: 'from-cyan-500 to-blue-500',
    delay: 0.2
  },
  {
    icon: '🕒',
    title: 'Giờ mở cửa',
    details: ['T2 - CN: 8:00 - 20:00', 'Nghỉ lễ theo quy định'],
    color: 'from-blue-500 to-sky-500',
    delay: 0.4
  }
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current
    const map = mapRef.current
    const background = section.querySelector('.background-pattern')

    const ctx = gsap.context(() => {
      // Background parallax effect
      if (background) {
        const elements = gsap.utils.toArray(background.children)
        elements.forEach((el) => {
          if (el instanceof Element) {
            gsap.to(el, {
            y: 'random(-100, 100)',
            x: 'random(-50, 50)',
            rotation: 'random(-180, 180)',
            duration: 'random(10, 20)',
            repeat: -1,
            yoyo: true,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          })
          }
        })
      }

      // Title animation with split text effect
      if (title) {
        const mainText = title.querySelector('h2')
        const subText = title.querySelector('p')
        
        gsap.fromTo(mainText, 
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.9,
            rotationX: -45
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        gsap.fromTo(subText,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      // Cards animation with enhanced effects
      if (cards) {
        const cardElements = cards.children
        
        // Initial animation for each card
        Array.from(cardElements).forEach((card: Element, index: number) => {
          const info = contactInfo[index]
          const icon = card.querySelector('.contact-icon')
          const content = card.querySelector('.contact-content')
          
          // Create timeline for each card
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 15%',
              toggleActions: 'play none none reverse'
            }
          })

          tl.fromTo(card,
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
              duration: 1,
              ease: 'back.out(1.7)',
              delay: info.delay
            }
          )
          .fromTo(icon,
            { scale: 0, rotation: -180 },
            { 
              scale: 1, 
              rotation: 0,
              duration: 0.6,
              ease: 'back.out(2)'
            },
            '-=0.4'
          )
          .fromTo(content?.children || [],
            { opacity: 0, x: -20 },
            { 
              opacity: 1, 
              x: 0,
              stagger: 0.1,
              duration: 0.4,
              ease: 'power2.out'
            },
            '-=0.2'
          )

          // Enhanced hover animations
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -15,
              scale: 1.05,
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
              duration: 0.4,
              ease: 'power3.out'
            })
            
            gsap.to(icon, {
              scale: 1.2,
              rotation: 15,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)'
            })
            
            gsap.to(content?.children || [], {
              y: -5,
              stagger: 0.05,
              duration: 0.3,
              ease: 'power2.out'
            })
          })
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              duration: 0.4,
              ease: 'power2.out'
            })
            
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            })
            
            gsap.to(content?.children || [], {
              y: 0,
              stagger: 0.05,
              duration: 0.3,
              ease: 'power2.out'
            })
          })
        })
      }

      // Enhanced map section animation
      if (map) {
        const mapContent = map.querySelector('.map-content')
        const mapIcon = map.querySelector('.map-icon')
        const buttons = map.querySelectorAll('button')
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: map,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        })

        tl.fromTo(map,
          { 
            opacity: 0, 
            scale: 0.8, 
            rotationY: -15,
            transformOrigin: 'left center'
          },
          { 
            opacity: 1, 
            scale: 1, 
            rotationY: 0,
            duration: 1.2,
            ease: 'back.out(1.7)'
          }
        )
        .fromTo(mapIcon,
          { scale: 0, rotation: -180 },
          { 
            scale: 1, 
            rotation: 0,
            duration: 0.6,
            ease: 'back.out(2)'
          },
          '-=0.6'
        )
        .fromTo(buttons,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.out'
          },
          '-=0.2'
        )

        // Add hover effect for map container
        map.addEventListener('mouseenter', () => {
          gsap.to(map, {
            scale: 1.02,
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12)',
            duration: 0.4,
            ease: 'power3.out'
          })
        })

        map.addEventListener('mouseleave', () => {
          gsap.to(map, {
            scale: 1,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08)',
            duration: 0.4,
            ease: 'power2.out'
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 bg-gradient-to-br from-white to-sky-50 relative overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="background-pattern absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-sky-500/5 via-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Title Section */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-clip-text relative">
            <GradientText className="leading-tight">
              Liên hệ với chúng tôi
            </GradientText>
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-sky-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Chúng tôi luôn sẵn sàng phục vụ bạn với chất lượng tốt nhất
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Cards */}
          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-sky-200 cursor-pointer relative overflow-hidden"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-sky-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className={`contact-icon relative w-20 h-20 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-lg transition-all duration-500 transform`}>
                  <span className="text-3xl text-white filter drop-shadow-md">{info.icon}</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                </div>
                
                {/* Content Container */}
                <div className="contact-content text-center relative z-10">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 group-hover:from-sky-600 group-hover:to-cyan-600 transition-all duration-300">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Map Section */}
          <div ref={mapRef} className="relative transform">
            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
              {/* Map Title */}
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent mb-8 text-center">
                Vị trí salon
              </h3>

              {/* Map Container */}
              <div className="bg-white rounded-2xl p-8 shadow-inner relative overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center relative">
                  {/* Map Icon */}
                  <div className="map-content text-center relative z-10">
                    <div className="map-icon w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl text-white">📍</span>
                    </div>
                    <p className="text-lg font-medium bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                      Bản đồ tương tác
                    </p>
                    <p className="text-slate-500 mt-2">123 Đường ABC, Quận XYZ</p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-100/20 to-cyan-100/20"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500/20 to-cyan-500/20"></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-cyan-500/20 to-sky-500/20"></div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-300 font-medium flex items-center justify-center group">
                  <span className="mr-2">🗺️</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Chỉ đường
                  </span>
                </button>
                <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 font-medium flex items-center justify-center group">
                  <span className="mr-2">📞</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Gọi ngay
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

