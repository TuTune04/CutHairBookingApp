FROM node:18-alpine AS base

# Cài đặt dependencies chỉ khi cần thiết
FROM base AS deps
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild source code chỉ khi cần thiết
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Biến môi trường cho Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma client
RUN npx prisma generate

# Build ứng dụng
RUN npm run build

# Production image, copy tất cả các file và chạy next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set quyền cho thư mục .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
