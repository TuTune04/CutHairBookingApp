'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { GradientText } from '@/components/TypewriterText'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const footerLinks = {
  quick: [
    { name: 'Đặt lịch', href: '/booking' },
    { name: 'Dịch vụ', href: '#services' },
    { name: 'Bảng giá', href: '#pricing' },
    { name: 'Liên hệ', href: '#contact' }
  ],
  social: [
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'TikTok', href: '#' }
  ]
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!footerRef.current) return

    const footer = footerRef.current
    const content = contentRef.current
    const background = backgroundRef.current

    const ctx = gsap.context(() => {
      // Background elements animation
      if (background) {
        gsap.fromTo(background.children, 
          { opacity: 0, scale: 0, rotation: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            rotation: 360,
            duration: 2,
            stagger: 0.3,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
              trigger: footer,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Continuous floating animation
        gsap.to(background.children, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-5, 5)',
          duration: 'random(4, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        })
      }

      // Content animation
      if (content) {
        gsap.fromTo(content.children, 
          { opacity: 0, y: 50, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: content,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      // Link hover animations
      const links = footer.querySelectorAll('a')
      Array.from(links).forEach((link: Element) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            y: -2,
            color: '#0ea5e9',
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        
        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            y: 0,
            color: '#cbd5e1',
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }, footerRef) // scope all animations to footerRef

    return () => ctx.revert() // cleanup
  }, { scope: footerRef })

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sky-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-sky-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-cyan-400/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <GradientText gradient="from-sky-400 to-cyan-400">Salon Pro</GradientText>
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Dịch vụ cắt tóc chuyên nghiệp với đội ngũ thợ tóc giàu kinh nghiệm và không gian hiện đại. 
              Chúng tôi cam kết mang đến cho bạn trải nghiệm tuyệt vời nhất.
            </p>
            <div className="flex space-x-4 pt-4">
              <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center hover:bg-sky-500/30 transition-colors duration-300 cursor-pointer">
                <span className="text-sky-400">f</span>
              </div>
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center hover:bg-cyan-500/30 transition-colors duration-300 cursor-pointer">
                <span className="text-cyan-400">i</span>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-300 cursor-pointer">
                <span className="text-blue-400">t</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {footerLinks.quick.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-slate-300 hover:text-sky-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-sky-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Thông tin liên hệ</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start">
                <span className="text-sky-400 mr-3 mt-1">📍</span>
                <div>
                  <p>123 Đường ABC, Quận XYZ</p>
                  <p>TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-cyan-400 mr-3">📞</span>
                <div>
                  <p>(028) 1234-5678</p>
                  <p>0901-234-567</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-blue-400 mr-3">🕒</span>
                <div>
                  <p>T2 - CN: 8:00 - 20:00</p>
                  <p>Nghỉ lễ theo quy định</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-center md:text-left">
              &copy; 2024 Salon Pro. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors duration-300">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors duration-300">
                Điều khoản sử dụng
              </Link>
              <Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors duration-300">
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

