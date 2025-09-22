'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { GradientText } from '@/components/TypewriterText'
import InteractiveButton from '@/components/InteractiveButton'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const pricingPlans = [
  {
    name: 'Cắt tóc nam',
    price: '80,000đ',
    features: ['Cắt tóc theo yêu cầu', 'Gội đầu', 'Tạo kiểu cơ bản'],
    popular: false
  },
  {
    name: 'Cắt tóc nữ',
    price: '120,000đ',
    features: ['Cắt tóc theo yêu cầu', 'Gội đầu', 'Sấy tạo kiểu'],
    popular: false
  },
  {
    name: 'Nhuộm tóc',
    price: '300,000đ',
    features: ['Tư vấn màu sắc', 'Nhuộm chất lượng cao', 'Chăm sóc sau nhuộm'],
    popular: false
  },
  {
    name: 'Gói VIP',
    price: '500,000đ',
    features: ['Cắt + nhuộm', 'Chăm sóc chuyên sâu', 'Tạo kiểu cao cấp'],
    popular: true
  }
]

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current

    const ctx = gsap.context(() => {
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

      // Cards animation with special effect for VIP card
      if (cards) {
        const cardElements = cards.children
        
        gsap.fromTo(cardElements, 
          { 
            opacity: 0, 
            y: 100, 
            scale: 0.8,
            rotationX: 45
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotationX: 0,
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

        // Special animation for VIP card
        const vipCard = cardElements[3] // VIP card is the 4th element
        if (vipCard) {
          gsap.to(vipCard, {
            boxShadow: '0 0 30px rgba(14, 165, 233, 0.3)',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        }

        // Hover animations for each card
        Array.from(cardElements).forEach((card: Element, index: number) => {
          const isVip = index === 3
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -15,
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out'
            })
            
            if (isVip) {
              gsap.to(card, {
                boxShadow: '0 25px 50px rgba(14, 165, 233, 0.4)',
                duration: 0.3
              })
            } else {
              gsap.to(card, {
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                duration: 0.3
              })
            }
          })
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            })
            
            if (isVip) {
              gsap.to(card, {
                boxShadow: '0 0 30px rgba(14, 165, 233, 0.3)',
                duration: 0.3
              })
            } else {
              gsap.to(card, {
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                duration: 0.3
              })
            }
          })
        })
      }
    }, sectionRef) // scope all animations to sectionRef

    return () => ctx.revert() // cleanup
  }, { scope: sectionRef })

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-sky-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <GradientText>Bảng giá dịch vụ</GradientText>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Giá cả hợp lý cho chất lượng dịch vụ tốt nhất
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                plan.popular 
                  ? 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white transform scale-105' 
                  : 'bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-sky-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Phổ biến nhất
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className={`text-lg font-semibold mb-2 ${
                  plan.popular ? 'text-white' : 'text-slate-900'
                }`}>
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span className={`text-3xl font-bold ${
                    plan.popular 
                      ? 'text-white' 
                      : 'bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent'
                  }`}>
                    {plan.price}
                  </span>
                </div>
                
                <ul className={`space-y-2 mb-6 text-sm ${
                  plan.popular ? 'text-white/90' : 'text-slate-600'
                }`}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        plan.popular ? 'bg-white/60' : 'bg-sky-500'
                      }`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <InteractiveButton 
                  variant={plan.popular ? 'secondary' : 'primary'} 
                  size="sm"
                  className="w-full"
                >
                  Chọn gói
                </InteractiveButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
