# 🌸 HOA VIẾNG - Hệ Thống Vận Hành & Quản Trị Hoa Tang Lễ 5 Phân Hệ

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mrtuyen861991/hoavieng-app)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Nền tảng thương mại điện tử chuyên nghiệp và hệ thống điều hành tập trung cho dịch vụ hoa kính viếng tang lễ, chia buồn cao cấp trên toàn quốc. Đảm bảo chuẩn mực văn hóa, nghi thức phúng viếng trang nghiêm, giao hoa hỏa tốc 60–90 phút và quy trình chụp ảnh báo cáo nghiệm thu thực tế (QC & POD).

---

## 🚀 Triển Khai 1-Click Lên Render.com

Bấm nút dưới đây để tạo website trực tuyến trên Render hoàn toàn miễn phí:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mrtuyen861991/hoavieng-app)

Render sẽ tự động đọc cấu hình `render.yaml`, cài đặt các gói phụ thuộc và khởi chạy dịch vụ web trên cổng môi trường `10000` (hoặc `$PORT`).

- 🛒 **Website Khách Hàng (Front-end):** `https://hoavieng-app.onrender.com/`
- ⚙️ **Cổng Quản Trị Hệ Thống (Admin):** `https://hoavieng-app.onrender.com/admin`

---

## 🌟 Tính Năng Nổi Bật

### 🛒 Giao Diện Khách Hàng (Front-end)
1. **Lưới Sản Phẩm Đặt Nhiều Nhất (Best Sellers):** Hiển thị 16 mẫu hoa trang trọng (4 dòng × 4 cột) với huy hiệu `🔥 Đặt nhiều nhất` và số lượt đặt thực tế.
2. **Hệ Thống Trang Danh Mục Con:**
   - **Vòng Hoa Kính Viếng:** `/vong-hoa` (Vòng hoa tròn truyền thống, hoa cúc, lan Mokara).
   - **Kệ Hoa Chia Buồn:** `/ke-hoa` (Kệ 1, 2, 3 tầng cao cấp cho cơ quan, doanh nghiệp).
   - **Giỏ Hoa Trang Nhã:** `/gio-hoa` (Lẵng hoa để bàn tư gia thanh tịnh).
   - **Lan Hồ Điệp Đại Tang:** `/lan-ho-diep` (Chậu lan trắng thuần khiết, tươi lâu 30 ngày).
3. **Ưu Đãi & Chính Sách:** `/uu-dai` (Voucher giảm giá, chính sách bảo mật, đổi trả, freeship bán kính 5km).
4. **Kiến Thức & Văn Hóa Tang Lễ (SEO Articles):** `/tin-tuc` (Bài viết cẩm nang phúng viếng, cách viết câu viếng trang trọng, phân trang 4 bài/trang).
5. **Hệ Thống Cửa Hàng & Liên Hệ:** `/lien-he` (Hotline 24/7 `0868 57 67 77`, tích hợp bản đồ Google Maps tương tác).
6. **Thanh Toán Tự Động VietQR MBBank:** Tự động tạo mã QR chuyển khoản chính xác tới số tài khoản MBBank `0966789639` (Chủ TK: `HOA VIENG`).
7. **Đánh Giá & Cảm Nhận Khách Hàng:** Hỗ trợ chấm điểm từ 1 đến 5 sao có kiểm duyệt trước khi hiển thị.

### ⚙️ Hệ Thống Vận Hành & Quản Trị 5 Phân Hệ (Admin)
1. **Tổng Quan & Vận Hành (KPIs):** Theo dõi doanh thu thời gian thực, số đơn hỏa tốc sát giờ viếng, biểu đồ giờ cao điểm và dòng hoạt động trực tiếp.
2. **Quy Trình Đơn Hàng 6 Bước (6-Stage Workflow):**
   - *Bước 1:* Tiếp nhận & Khớp thanh toán VietQR MBBank
   - *Bước 2:* Tự động điều phối & Gán đơn shop hoa vệ tinh theo quận/huyện
   - *Bước 3:* Đang cắm hoa & Cảnh báo thiếu nguyên liệu cốt
   - *Bước 4:* Kiểm định chất lượng (QC) 100% trước khi xuất xưởng
   - *Bước 5:* Điều phối giao hàng & Live map theo dõi lộ trình shipper
   - *Bước 6:* Bàn giao tại tang lễ & Chụp ảnh đối soát hiện trường (POD)
3. **Quản Lý Mẫu Hoa & Chọn Mẫu Đặt Nhiều Nhất:**
   - Nút bật/tắt nhanh 1-chạm `🔥 Đặt nhiều nhất` đồng bộ tức thì ra trang chủ.
   - Modal quản lý chuyên sâu, sửa nhanh số lượt đặt, chọn nhanh Top 8 hoặc Top 16.
4. **Kiểm Định QC & Thư Viện Ảnh Báo Cáo (POD):** Đối soát ảnh mẫu với ảnh thực tế tại tang lễ trước khi duyệt giao.
5. **Tài Chính, Payout Shop & Báo Cáo:** Quyết toán tiền hoa cho shop đối tác, đối soát ngân hàng MBBank, phân quyền RBAC và ghi nhật ký hoạt động (Audit Log).

---

## 💻 Hướng Dẫn Chạy Cục Bộ (Localhost)

```bash
# 1. Clone repository
git clone https://github.com/mrtuyen861991/hoavieng-app.git
cd hoavieng-app

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi chạy máy chủ
npm start

# 4. Truy cập trình duyệt
http://localhost:2000          # Giao diện Khách hàng
http://localhost:2000/admin     # Giao diện Quản trị Admin
```

---

## 🛠️ Cấu Trúc Thư Mục

```
hoavieng-app/
├── public/                 # Giao diện web & tài nguyên tĩnh
│   ├── index.html          # Trang chủ website
│   ├── admin.html          # Bảng điều khiển quản trị 5 phân hệ
│   ├── danh-muc.html       # Trang danh mục sản phẩm chi tiết
│   ├── uu-dai.html         # Trang chương trình ưu đãi & chính sách
│   ├── tin-tuc.html        # Trang tin tức cẩm nang tang lễ
│   ├── lien-he.html        # Trang thông tin liên hệ & bản đồ cửa hàng
│   ├── chinh-sach.html     # Trang bài viết chính sách & quy định
│   └── assets/             # Hình ảnh sản phẩm, banner, biểu tượng
├── data.json               # Cơ sở dữ liệu JSON thời gian thực
├── server.js               # Máy chủ Express & toàn bộ REST API
├── package.json            # Thông tin dự án & dependencies
├── render.yaml             # Cấu hình tự động triển khai lên Render
├── .gitignore              # Danh sách tệp loại trừ khi đưa lên Git
└── README.md               # Tài liệu hướng dẫn sử dụng
```

---

## 📞 Thông Tin Liên Hệ & Hỗ Trợ
- **Đơn vị:** HOA VIẾNG - Gửi trọn lời tưởng nhớ
- **Hotline 24/7:** 0868 57 67 77
- **Tài khoản thụ hưởng:** Ngân hàng Quân Đội (MBBank) - STK: `0966789639` - Tên: `HOA VIENG`
- **Email:** info@hoavieng.vn
- **Website chính:** [https://hoavieng-app.onrender.com](https://hoavieng-app.onrender.com)

*Bản quyền © 2026 Hoa Viếng. Phát triển bởi Huu Tuyen.*
