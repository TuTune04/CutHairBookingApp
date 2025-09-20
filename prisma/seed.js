const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Tạo admin mặc định
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@salon.com' },
    update: {},
    create: {
      email: 'admin@salon.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  })
  console.log('Admin created:', admin)

  // Tạo dữ liệu mẫu cho các lịch hẹn
  const appointments = [
    {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      service: 'cut-male',
      datetime: new Date('2025-09-20T10:00:00'),
      status: 'CONFIRMED'
    },
    {
      name: 'Trần Thị B',
      phone: '0912345678',
      service: 'cut-female',
      datetime: new Date('2025-09-20T14:00:00'),
      status: 'PENDING'
    },
    {
      name: 'Lê Văn C',
      phone: '0923456789',
      service: 'dye',
      datetime: new Date('2025-09-21T11:00:00'),
      status: 'PENDING'
    },
    {
      name: 'Phạm Thị D',
      phone: '0934567890',
      service: 'vip',
      datetime: new Date('2025-09-22T15:30:00'),
      status: 'PENDING'
    }
  ]

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: appointment
    })
  }
  console.log('Sample appointments created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
