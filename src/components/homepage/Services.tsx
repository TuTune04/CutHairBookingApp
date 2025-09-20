'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GradientText } from '@/components/TypewriterText'
import { useOptimizedGSAP } from '@/hooks/useOptimizedGSAP'
import styles from './Services.module.css'
// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Random images for services
const serviceImages = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop&crop=face'
]

const services = [
  {
    icon: '✂️',
    title: 'Cắt tóc',
    description: 'Cắt tóc theo yêu cầu với kỹ thuật chuyên nghiệp và tạo kiểu phù hợp',
    image: serviceImages[0]
  },
  {
    icon: '💇‍♀️',
    title: 'Tạo kiểu',
    description: 'Tạo kiểu tóc đẹp mắt cho các dịp đặc biệt và cuộc sống hàng ngày',
    image: serviceImages[1]
  },
  {
    icon: '🎨',
    title: 'Nhuộm tóc',
    description: 'Nhuộm tóc với màu sắc đa dạng và chất lượng cao',
    image: serviceImages[2]
  },
  {
    icon: '💆‍♀️',
    title: 'Chăm sóc tóc',
    description: 'Dịch vụ chăm sóc tóc chuyên sâu để tóc khỏe mạnh và bóng mượt',
    image: serviceImages[3]
  },
  {
    icon: '🧴',
    title: 'Gội đầu',
    description: 'Gội đầu với các sản phẩm chất lượng cao và massage thư giãn',
    image: serviceImages[4]
  },
  {
    icon: '💅',
    title: 'Dịch vụ khác',
    description: 'Các dịch vụ làm đẹp khác như cạo râu, cắt móng tay',
    image: serviceImages[5]
  }
]

export default function Services() {
  return (

    <section> 
        <div className={styles.bannerServices}>
            <ul>
                {services.map((service, index) => (
                    <li key={index}>
                        <h3>{service.title}</h3>
                    </li>
                ))}
            </ul>
            <ul aria-hidden="true">
                {services.map((service, index) => (
                    <li key={index}>
                        <h3>{service.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    </section>
  )
}

