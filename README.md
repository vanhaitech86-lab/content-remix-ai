# 🎬 Content Remix AI

> Công cụ AI giúp phân tích nội dung video, tái sáng tạo kịch bản và tạo video mới — an toàn bản quyền.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng](#-tính-năng)
- [Cài đặt nhanh](#-cài-đặt-nhanh)
- [Chạy với Docker](#-chạy-với-docker)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cấu hình API](#-cấu-hình-api)
- [Tính năng hoạt động vs Mock](#-tính-năng-hoạt-động-vs-mock)
- [Bảo mật](#-bảo-mật)
- [Đóng góp](#-đóng-góp)

## 🌟 Tổng quan

Content Remix AI là công cụ giúp người dùng:

1. **Phân tích** nội dung video từ URL hoặc file upload
2. **Trích xuất** transcript/phụ đề hợp pháp
3. **Phân tích** cấu trúc, phương pháp truyền tải bằng AI
4. **Tái sáng tạo** kịch bản hoàn toàn mới theo chủ đề và đối tượng riêng
5. **Tạo video** mới từ kịch bản
6. **Xuất** theo định dạng YouTube, TikTok, hoặc vuông
7. **Đăng** lên nền tảng qua API chính thức

### Nguyên tắc bản quyền

- ✅ Chỉ xử lý nội dung người dùng sở hữu hoặc được phép sử dụng
- ✅ Tái sáng tạo đáng kể, không sao chép nguyên văn
- ✅ Kiểm tra độ tương đồng trước khi render
- ❌ Không tải video trái phép
- ❌ Không clone giọng nói/khuôn mặt khi chưa có đồng ý
- ❌ Không vượt DRM, CAPTCHA hoặc cơ chế bảo vệ

## ✨ Tính năng

| Tính năng | Trạng thái |
|-----------|-----------|
| Đăng nhập/Đăng ký | ✅ Hoạt động |
| Dashboard & Quản lý dự án | ✅ Hoạt động |
| Nhập URL YouTube/TikTok | ✅ Hoạt động (validation) |
| Upload file video/audio/transcript | ✅ Hoạt động |
| Paste transcript thủ công | ✅ Hoạt động |
| Transcript editor với timestamps | ✅ Hoạt động |
| Phân tích nội dung AI | 🔶 Mock (cần API key) |
| Tạo kịch bản mới | 🔶 Mock (cần API key) |
| Script editor (drag-drop, undo/redo) | ✅ Hoạt động |
| Kiểm tra độ tương đồng | ✅ Hoạt động |
| Storyboard view | ✅ Hoạt động |
| Video timeline editor | ✅ Hoạt động (UI) |
| Voice-over (TTS) | 🔶 Mock (cần API key) |
| Render video (FFmpeg) | 🔶 Mock (cần FFmpeg) |
| Export MP4/SRT/VTT/ZIP | ✅ Hoạt động |
| OAuth YouTube/TikTok | 🔶 Mock (cần OAuth credentials) |
| Đăng video | 🔶 Mock (cần API approval) |
| Dark/Light mode | ✅ Hoạt động |
| Responsive design | ✅ Hoạt động |

## 🚀 Cài đặt nhanh

### Yêu cầu

- **Node.js** 18+ 
- **npm** 9+
- **FFmpeg** (tùy chọn, cho video rendering thật)

### Bước 1: Clone và cài đặt

```bash
cd content-remix-ai
npm install
```

### Bước 2: Cấu hình môi trường

```bash
cp .env.example .env
```

Mở file `.env` và điền `NEXTAUTH_SECRET` (bất kỳ chuỗi ngẫu nhiên nào):

```
NEXTAUTH_SECRET="my-secret-key-12345"
```

### Bước 3: Khởi tạo database

```bash
npx prisma db push
npm run db:seed
```

### Bước 4: Chạy ứng dụng

```bash
npm run dev
```

Mở **http://localhost:3000**

### Tài khoản demo

| Email | Mật khẩu | Vai trò |
|-------|----------|---------|
| demo@contentremix.ai | demo123456 | User |
| admin@contentremix.ai | admin123456 | Admin |

## 🐳 Chạy với Docker

```bash
docker-compose up --build
```

## 📁 Cấu trúc dự án

```
content-remix-ai/
├── prisma/                    # Database schema & seed
│   ├── schema.prisma         # 20+ tables
│   └── seed.ts               # Demo data
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Login, Register
│   │   ├── (dashboard)/      # Dashboard, Projects, Settings
│   │   │   └── projects/[id]/ # Project workspace (8 tabs)
│   │   ├── (legal)/          # Privacy, Terms, Copyright
│   │   └── api/              # API routes (15+ endpoints)
│   ├── components/
│   │   ├── ui/               # Base UI components (15+)
│   │   ├── layout/           # Sidebar, Header, ThemeProvider
│   │   └── ...               # Feature components
│   ├── lib/
│   │   ├── providers/        # AI, STT, TTS, Platform abstractions
│   │   ├── similarity.ts     # Content similarity checker
│   │   ├── validators.ts     # Zod schemas
│   │   ├── auth.ts           # NextAuth config
│   │   └── db.ts             # Prisma client
│   ├── store/                # Zustand state management
│   └── types/                # TypeScript definitions
├── tests/                    # Jest tests
├── .env.example              # Environment template
├── docker-compose.yml        # Docker setup
├── Dockerfile                # Production build
└── README.md
```

## 🔧 Cấu hình API

### AI Text (OpenAI / Gemini)

```env
AI_TEXT_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
```

Hoặc:

```env
AI_TEXT_PROVIDER="gemini"
GEMINI_API_KEY="..."
```

### Speech-to-Text (Whisper)

```env
STT_PROVIDER="whisper"
WHISPER_API_KEY="sk-..."
```

### Text-to-Speech (ElevenLabs)

```env
TTS_PROVIDER="elevenlabs"
ELEVENLABS_API_KEY="..."
```

### YouTube API

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới
3. Bật YouTube Data API v3
4. Tạo OAuth 2.0 credentials
5. Thêm redirect URI: `http://localhost:3000/api/connections/youtube/callback`

```env
YOUTUBE_CLIENT_ID="..."
YOUTUBE_CLIENT_SECRET="..."
```

### TikTok API

1. Vào [TikTok Developer Portal](https://developers.tiktok.com/)
2. Tạo app mới
3. Xin phê duyệt các scope cần thiết

```env
TIKTOK_CLIENT_KEY="..."
TIKTOK_CLIENT_SECRET="..."
```

### FFmpeg

Cài đặt FFmpeg và đặt:

```env
FFMPEG_MOCK="false"
FFMPEG_PATH="/usr/bin/ffmpeg"  # hoặc để trống để auto-detect
```

## 🔒 Bảo mật

- Mật khẩu hash bằng bcrypt (12 rounds)
- JWT tokens cho authentication
- CSRF protection (Next.js built-in)
- Input validation với Zod
- File type checking (MIME type)
- Rate limiting
- Audit logging cho hành động quan trọng
- OAuth tokens không ghi vào log
- Consent records trước khi xử lý nội dung

## 📝 Commands

```bash
# Development
npm run dev              # Chạy dev server
npm run build            # Build production
npm run start            # Chạy production

# Database
npx prisma db push       # Sync schema
npx prisma migrate dev   # Tạo migration
npm run db:seed          # Seed data
npx prisma studio        # Database GUI

# Quality
npm run lint             # ESLint
npm run type-check       # TypeScript check
npm run test             # Jest tests
```

## 📄 License

MIT License

---

**Content Remix AI** — Tái sáng tạo nội dung, không sao chép.
