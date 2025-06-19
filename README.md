# Website-Selling-Sportswear-And-Souvenirs
Dự án website bán đồ thể thao và quà lưu niệm cung cấp các sản phẩm thể thao chất lượng cao như áo thun, giày chạy, đồ tập gym, và phụ kiện thể thao. Bên cạnh đó, website cũng bán các món quà lưu niệm, đồ fan của các đội thể thao như áo đấu, mũ, khăn quàng, và các sản phẩm đặc trưng.
# Thành Viên
 - Le Tien Dat 23010040
 - Cao Thai Son 23010566
 - Trinh Tran Nguyen Vu 23010529

# 🧱 Tổng quan dự án

**Sports Shop** là một hệ thống web bán hàng thể thao được xây dựng với:
- **Next.js (App Router)** – định nghĩa route theo cấu trúc thư mục
- **TypeScript** – ngôn ngữ an toàn kiểu
- **TailwindCSS** – framework CSS tiện dụng
- **Prisma** – ORM kết nối cơ sở dữ liệu
- Hỗ trợ cả frontend người dùng và dashboard quản trị


# 🌐 Cấu trúc thư mục chính


sports-shop/
├── app/              # Các trang (route) chính
├── components/       # Component giao diện tái sử dụng
├── contexts/         # React context chia sẻ dữ liệu
├── hooks/            # Custom React hooks
├── lib/              # Tiện ích, kết nối DB, API helper
├── public/           # Tài nguyên tĩnh (ảnh, logo)
├── styles/           # Tệp CSS toàn cục
├── package.json      # Thư viện và script
├── tsconfig.json     # Cấu hình TypeScript
├── tailwind.config.ts# Cấu hình Tailwind

# 🧩 Thư mục `app/` – Các trang chính

### Người dùng:
| Route             | Mô tả |
|-------------------|------|
| `/`               | Trang chủ |
| `/auth/login`     | Đăng nhập |
| `/auth/register`  | Đăng ký |
| `/cart`           | Giỏ hàng |
| `/checkout`       | Thanh toán |
| `/orders`         | Xem đơn hàng |
| `/profile`        | Hồ sơ cá nhân |
| `/settings`       | Cài đặt tài khoản |

### Quản trị viên:
| Route                     | Mô tả |
|---------------------------|------|
| `/admin`                 | Dashboard tổng quan |
| `/admin/products`        | Quản lý sản phẩm |
| `/admin/products/add`    | Thêm sản phẩm |
| `/admin/products/edit/:id`| Sửa sản phẩm |
| `/admin/orders`          | Xử lý đơn hàng |
| `/admin/users`           | Danh sách người dùng |
| `/admin/reports`         | Báo cáo doanh thu |
| `/admin/settings`        | Cấu hình hệ thống |

# 🧠 `contexts/` – Context chia sẻ dữ liệu

- `AuthContext`: Lưu thông tin đăng nhập người dùng
- `CartContext`: Quản lý giỏ hàng toàn cục

# 🔁 `hooks/` – Custom hooks

- `useAuth()`: Kiểm tra trạng thái người dùng
- `useCart()`: Thêm/xóa/cập nhật giỏ hàng
- `useProductFilter()`: Lọc sản phẩm theo danh mục, giá,...

# 🧰 `lib/` – Tiện ích & xử lý backend

- `lib/prisma.ts`: Kết nối CSDL bằng Prisma
- `lib/auth.ts`: Hàm xác thực người dùng (dành cho Server Actions)
- `lib/utils.ts`: Format tiền, xử lý chuỗi
- `lib/api.ts`: Hàm fetch dữ liệu từ API

# 🧱 `components/` – Component tái sử dụng

| Tên component       | Mô tả |
|---------------------|------|
| `Navbar`, `Footer`  | Thanh điều hướng |
| `ProductCard`       | Hiển thị sản phẩm |
| `CartItem`          | Hiển thị item trong giỏ hàng |
| `FormInput`, `Button`| Input & button với style Tailwind |

# ⚙️ Cấu hình & công cụ

- **Tailwind CSS**: cấu hình tại `tailwind.config.ts`
- **PostCSS**: dùng với Tailwind trong `postcss.config.mjs`
- **TypeScript**: cấu hình alias `@/` trong `tsconfig.json`
- **Next.js**: dùng App Router, Server Actions

# 🚀 Cách chạy dự án

Dùng gitbash để chạy
- Cài đặt dependencies
pnpm install

- Chạy server dev
pnpm dev

- Build production
pnpm build && pnpm start




