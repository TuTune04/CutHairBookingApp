import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Salon Đặt Lịch - Dịch vụ cắt tóc chuyên nghiệp',
  description: 'Đặt lịch cắt tóc nhanh chóng và tiện lợi tại salon của chúng tôi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
