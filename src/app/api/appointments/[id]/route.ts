import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/appointments/[id] - Lấy thông tin lịch hẹn theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {

    const appointment = await prisma.appointment.findUnique({
      where: { id }
    })

    if (!appointment) {
      return NextResponse.json(
        { message: 'Không tìm thấy lịch hẹn' },
        { status: 404 }
      )
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi lấy thông tin lịch hẹn' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments/[id] - Cập nhật lịch hẹn
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const { name, phone, service, datetime, status } = body

    // Kiểm tra lịch hẹn tồn tại
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    })

    if (!existingAppointment) {
      return NextResponse.json(
        { message: 'Không tìm thấy lịch hẹn' },
        { status: 404 }
      )
    }

    // Validate input
    if (name && typeof name !== 'string') {
      return NextResponse.json(
        { message: 'Tên không hợp lệ' },
        { status: 400 }
      )
    }

    if (phone && !/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { message: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      )
    }

    // Cập nhật lịch hẹn
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(service && { service }),
        ...(datetime && { datetime: new Date(datetime) }),
        ...(status && { status })
      }
    })

    return NextResponse.json(updatedAppointment)
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi cập nhật lịch hẹn' },
      { status: 500 }
    )
  }
}

// DELETE /api/appointments/[id] - Xóa lịch hẹn
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {

    // Kiểm tra lịch hẹn tồn tại
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id }
    })

    if (!existingAppointment) {
      return NextResponse.json(
        { message: 'Không tìm thấy lịch hẹn' },
        { status: 404 }
      )
    }

    // Xóa lịch hẹn
    await prisma.appointment.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Xóa lịch hẹn thành công' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi xóa lịch hẹn' },
      { status: 500 }
    )
  }
}
