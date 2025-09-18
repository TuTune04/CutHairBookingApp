import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/appointments - Lấy danh sách lịch hẹn
export async function GET(request: NextRequest) {
  try {
    // Chỉ admin mới có quyền xem danh sách lịch hẹn (sẽ thêm xác thực sau)
    const appointments = await prisma.appointment.findMany({
      orderBy: { datetime: 'asc' }
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi lấy danh sách lịch hẹn' },
      { status: 500 }
    )
  }
}

// POST /api/appointments - Tạo lịch hẹn mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, service, datetime } = body

    // Validate input
    if (!name || !phone || !service || !datetime) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    // Validate phone number
    if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { message: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      )
    }

    // Validate datetime
    const appointmentDate = new Date(datetime)
    const now = new Date()
    if (appointmentDate <= now) {
      return NextResponse.json(
        { message: 'Thời gian đặt lịch phải sau thời điểm hiện tại' },
        { status: 400 }
      )
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        name,
        phone,
        service,
        datetime: appointmentDate,
        status: 'PENDING'
      }
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi tạo lịch hẹn' },
      { status: 500 }
    )
  }
}
