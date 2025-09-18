'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const services = [
  { id: 'cut-male', name: 'Cắt tóc nam', price: 80000 },
  { id: 'cut-female', name: 'Cắt tóc nữ', price: 120000 },
  { id: 'dye', name: 'Nhuộm tóc', price: 300000 },
  { id: 'style', name: 'Tạo kiểu', price: 150000 },
  { id: 'wash', name: 'Gội đầu', price: 50000 },
  { id: 'vip', name: 'Gói VIP', price: 500000 },
]

export default function BookingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    datetime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }
    
    if (!formData.service) {
      newErrors.service = 'Vui lòng chọn dịch vụ'
    }
    
    if (!formData.datetime) {
      newErrors.datetime = 'Vui lòng chọn ngày giờ'
    } else {
      const selectedDate = new Date(formData.datetime)
      const now = new Date()
      if (selectedDate <= now) {
        newErrors.datetime = 'Ngày giờ phải sau thời điểm hiện tại'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        alert('Đặt lịch thành công! Chúng tôi sẽ liên hệ lại với bạn.')
        router.push('/')
      } else {
        const error = await response.json()
        alert('Có lỗi xảy ra: ' + error.message)
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi đặt lịch')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const selectedService = services.find(s => s.id === formData.service)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt lịch cắt tóc
            </h1>
            <p className="text-gray-600">
              Điền thông tin để đặt lịch dịch vụ của chúng tôi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Họ tên */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập họ và tên của bạn"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Dịch vụ */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Dịch vụ *
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Chọn dịch vụ</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price.toLocaleString('vi-VN')}đ
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-red-600">{errors.service}</p>
              )}
            </div>

            {/* Ngày giờ */}
            <div>
              <label htmlFor="datetime" className="block text-sm font-medium text-gray-700 mb-2">
                Ngày và giờ *
              </label>
              <input
                type="datetime-local"
                id="datetime"
                value={formData.datetime}
                onChange={(e) => handleInputChange('datetime', e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.datetime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.datetime && (
                <p className="mt-1 text-sm text-red-600">{errors.datetime}</p>
              )}
            </div>

            {/* Tóm tắt */}
            {selectedService && formData.datetime && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Tóm tắt đặt lịch:</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Dịch vụ:</strong> {selectedService.name}</p>
                  <p><strong>Giá:</strong> {selectedService.price.toLocaleString('vi-VN')}đ</p>
                  <p><strong>Thời gian:</strong> {new Date(formData.datetime).toLocaleString('vi-VN')}</p>
                </div>
              </div>
            )}

            {/* Nút submit */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang xử lý...' : 'Đặt lịch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
