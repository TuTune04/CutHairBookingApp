# Ứng dụng đặt lịch cắt tóc

Ứng dụng web đặt lịch cắt tóc được xây dựng với Next.js, Tailwind CSS, và PostgreSQL.

## Tính năng

- **Landing page** giới thiệu dịch vụ salon, giá, thông tin liên hệ
- **Form đặt lịch** với validation đầy đủ
- **Trang quản trị** để xem và quản lý danh sách đặt lịch
- **Xác thực** cho admin
- **API đầy đủ** cho CRUD operations
- **Docker** để dễ dàng triển khai

## Công nghệ sử dụng

- **Frontend**: Next.js (App Router), Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL với Prisma ORM
- **Authentication**: NextAuth.js
- **Containerization**: Docker và docker-compose

## Cấu trúc dự án

```
cuthair-booking-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Trang quản trị
│   │   │   ├── dashboard/      # Dashboard quản lý lịch hẹn
│   │   │   └── login/          # Trang đăng nhập
│   │   ├── api/                # API Routes
│   │   │   ├── appointments/   # API quản lý lịch hẹn
│   │   │   └── auth/           # API xác thực
│   │   ├── booking/            # Trang đặt lịch
│   │   └── page.tsx            # Landing page
│   ├── components/             # UI Components
│   ├── lib/                    # Utilities và helpers
│   └── types/                  # TypeScript type definitions
├── prisma/                     # Prisma schema và migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seeding script
├── public/                     # Static assets
├── docker-compose.yml          # Docker Compose config
├── Dockerfile                  # Docker config
└── next.config.js              # Next.js config
```

## Cài đặt và chạy

### Phương pháp 1: Sử dụng Docker (Khuyến nghị)

1. Clone repository:

```bash
git clone <repository-url>
cd cuthair-booking-app
```

2. Chạy ứng dụng với Docker Compose:

```bash
docker-compose up -d
```

3. Truy cập ứng dụng tại: http://localhost:3000

### Phương pháp 2: Chạy trực tiếp

1. Clone repository:

```bash
git clone <repository-url>
cd cuthair-booking-app
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Cấu hình biến môi trường:
   - Tạo file `.env.local` từ file `.env.example`
   - Cập nhật các biến môi trường theo cấu hình của bạn

4. Tạo database và chạy migrations:

```bash
npx prisma migrate dev
```

5. Seed dữ liệu mẫu:

```bash
npm run seed
```

6. Chạy ứng dụng:

```bash
npm run dev
```

7. Truy cập ứng dụng tại: http://localhost:3000

## Tài khoản mặc định

- **Email**: admin@salon.com
- **Password**: admin123

## API Endpoints

- `GET /api/appointments` - Lấy danh sách lịch hẹn
- `POST /api/appointments` - Tạo lịch hẹn mới
- `GET /api/appointments/:id` - Lấy thông tin lịch hẹn theo ID
- `PUT /api/appointments/:id` - Cập nhật lịch hẹn
- `DELETE /api/appointments/:id` - Xóa lịch hẹn

## Cấu trúc database

### Bảng `users`
- `id`: String (Primary Key)
- `email`: String (Unique)
- `password`: String (Bcrypt hash)
- `role`: Enum (ADMIN, USER)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Bảng `appointments`
- `id`: String (Primary Key)
- `name`: String
- `phone`: String
- `service`: String
- `datetime`: DateTime
- `status`: Enum (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- `createdAt`: DateTime
- `updatedAt`: DateTime