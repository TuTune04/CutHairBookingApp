import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Salon Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#services" className="text-gray-500 hover:text-gray-900">
                Dịch vụ
              </Link>
              <Link href="#pricing" className="text-gray-500 hover:text-gray-900">
                Bảng giá
              </Link>
              <Link href="#contact" className="text-gray-500 hover:text-gray-900">
                Liên hệ
              </Link>
            </nav>
            <Link
              href="/booking"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Đặt lịch ngay
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Salon Chuyên Nghiệp
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Trải nghiệm dịch vụ cắt tóc, tạo kiểu và chăm sóc tóc chuyên nghiệp 
            với đội ngũ thợ tóc giàu kinh nghiệm và không gian hiện đại.
          </p>
          <Link
            href="/booking"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Đặt lịch ngay
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-xl text-gray-600">
              Các dịch vụ chuyên nghiệp được yêu thích nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cắt tóc</h3>
              <p className="text-gray-600">
                Cắt tóc theo yêu cầu với kỹ thuật chuyên nghiệp và tạo kiểu phù hợp
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💇‍♀️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tạo kiểu</h3>
              <p className="text-gray-600">
                Tạo kiểu tóc đẹp mắt cho các dịp đặc biệt và cuộc sống hàng ngày
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nhuộm tóc</h3>
              <p className="text-gray-600">
                Nhuộm tóc với màu sắc đa dạng và chất lượng cao
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💆‍♀️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chăm sóc tóc</h3>
              <p className="text-gray-600">
                Dịch vụ chăm sóc tóc chuyên sâu để tóc khỏe mạnh và bóng mượt
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧴</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gội đầu</h3>
              <p className="text-gray-600">
                Gội đầu với các sản phẩm chất lượng cao và massage thư giãn
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dịch vụ khác</h3>
              <p className="text-gray-600">
                Các dịch vụ làm đẹp khác như cạo râu, cắt móng tay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bảng giá dịch vụ
            </h2>
            <p className="text-xl text-gray-600">
              Giá cả hợp lý cho chất lượng dịch vụ tốt nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cắt tóc nam</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">80,000đ</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cắt tóc theo yêu cầu</li>
                <li>• Gội đầu</li>
                <li>• Tạo kiểu cơ bản</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cắt tóc nữ</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">120,000đ</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cắt tóc theo yêu cầu</li>
                <li>• Gội đầu</li>
                <li>• Sấy tạo kiểu</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nhuộm tóc</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">300,000đ</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tư vấn màu sắc</li>
                <li>• Nhuộm chất lượng cao</li>
                <li>• Chăm sóc sau nhuộm</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gói VIP</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">500,000đ</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cắt + nhuộm</li>
                <li>• Chăm sóc chuyên sâu</li>
                <li>• Tạo kiểu cao cấp</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-xl text-gray-600">
              Chúng tôi luôn sẵn sàng phục vụ bạn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Địa chỉ</h3>
              <p className="text-gray-600">
                123 Đường ABC, Quận XYZ<br />
                TP. Hồ Chí Minh
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Điện thoại</h3>
              <p className="text-gray-600">
                (028) 1234-5678<br />
                0901-234-567
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🕒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Giờ mở cửa</h3>
              <p className="text-gray-600">
                T2 - CN: 8:00 - 20:00<br />
                Nghỉ lễ theo quy định
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Salon Pro</h3>
              <p className="text-gray-400">
                Dịch vụ cắt tóc chuyên nghiệp với đội ngũ thợ tóc giàu kinh nghiệm.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/booking" className="hover:text-white">Đặt lịch</Link></li>
                <li><Link href="#services" className="hover:text-white">Dịch vụ</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Bảng giá</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <span className="text-gray-400">Facebook</span>
                <span className="text-gray-400">Instagram</span>
                <span className="text-gray-400">TikTok</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Salon Pro. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
