const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data.json');
let existing = {};
try {
  existing = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
} catch (e) {
  existing = {};
}

// 1. KPI Stats
const stats = {
  todayRevenue: 34500000,
  todayRevenueFormatted: "34.500.000đ",
  monthRevenue: 685000000,
  monthRevenueFormatted: "685.000.000đ",
  urgentOrdersCount: 3,
  slaRate: 98.6,
  b2bRevenue: 428000000,
  b2bRevenuePercent: 62.5,
  ordersToday: 24,
  pendingOrders: 5,
  shippingOrders: 7,
  completedOrders: 1248,
  hourlyRevenue: [
    { hour: "06h-08h", orders: 3, revenue: 4200000, staffLoad: "Thấp" },
    { hour: "08h-10h", orders: 8, revenue: 11800000, staffLoad: "Cao (Cần tăng thợ)" },
    { hour: "10h-12h", orders: 6, revenue: 8500000, staffLoad: "Vừa" },
    { hour: "12h-14h", orders: 2, revenue: 2600000, staffLoad: "Thấp" },
    { hour: "14h-16h", orders: 7, revenue: 10400000, staffLoad: "Cao" },
    { hour: "16h-18h", orders: 5, revenue: 7200000, staffLoad: "Vừa" },
    { hour: "18h-20h", orders: 3, revenue: 4500000, staffLoad: "Thấp" }
  ],
  topProducts: [
    { name: "Kệ hoa chia buồn 2 tầng Vĩnh Cửu", sku: "HV-KE02", sold: 142, revenue: 213000000, growth: "+18%" },
    { name: "Vòng hoa cúc trắng dạng tròn tiễn biệt", sku: "HV-VH01", sold: 128, revenue: 153600000, growth: "+12%" },
    { name: "Lan hồ điệp trắng 10 cành đại tang", sku: "HV-LAN10", sold: 85, revenue: 170000000, growth: "+25%" },
    { name: "Kệ hoa lan vàng hoàng gia kính viếng", sku: "HV-KE03", sold: 76, revenue: 136800000, growth: "+8%" },
    { name: "Vòng Hoa Thánh Giá Đạo Thiên Chúa", sku: "HV-TG01", sold: 64, revenue: 96000000, growth: "+15%" }
  ]
};

// 2. Orders enriched with 6-stage workflow & funeral details
const orders = [
  {
    id: "DH26092501",
    seq: 1,
    customer: "Nguyễn Thị Lan",
    customerType: "B2C",
    companyName: "",
    phone: "0912 345 678",
    product: "Vòng hoa cúc trắng dạng tròn tiễn biệt",
    productId: "prod-1",
    sku: "HV-VH01",
    price: 1200000,
    cost: 750000,
    status: "Đang giao",
    time: "09:30 25/09",
    fullTimestamp: "2026-09-25T09:30:00",
    district: "Quận 3",
    address: "Nhà tang lễ TP.HCM, Số 25 Lê Quý Đôn, Phường Võ Thị Sáu, Q.3",
    isUrgent: true,
    urgentReason: "Khâm liệm lúc 11:30 - Cần giao trước 11:00",
    deliveryDeadline: "11:00 hôm nay",
    minutesLeft: 35,
    deceased: {
      name: "Cố Cụ Bà: NGUYỄN THỊ MAI (Hưởng thọ 89 tuổi)",
      funeralTime: "Khâm liệm: 09:00 | Động quan: 14:00 ngày 26/09",
      place: "Vãng Sanh Đường - Nhà tang lễ TP.HCM"
    },
    ribbon: "Ban Giám Đốc Công Ty Cổ Phần Công Nghệ ABC - Thành Kính Phân Ưu",
    ribbonStyle: "Lụa đen chữ vàng kim sang trọng",
    assignedPartner: {
      id: "part-1",
      name: "Shop Hoa Tươi Sài Gòn Q.3",
      phone: "0908 111 222",
      address: "148 Võ Thị Sáu, Q.3"
    },
    shipper: {
      name: "Trần Quốc Bảo",
      phone: "0988 123 456",
      plate: "59F1-889.24",
      eta: "10:35 - 10:50 (Còn 25 phút)",
      currentLocation: "Đang di chuyển trên đường Nam Kỳ Khởi Nghĩa, cách 1.2km"
    },
    photos: {
      shopPhoto: "/assets/products/prod_1_cuc_trang_tien_biet.jpg",
      funeralPhoto: "/assets/products/prod_1_cuc_trang_tien_biet.jpg",
      gpsLocation: "10.7785° N, 106.6912° E (Nhà tang lễ TP.HCM, Q.3)"
    },
    qcStatus: "Đã duyệt",
    qcReviewer: "Trần Thùy Linh (QC)",
    paymentStatus: "Đã thanh toán (MBBank VietQR)",
    notes: "Chụp ảnh xác nhận gửi Zalo trước khi đặt vào linh đường"
  },
  {
    id: "DH26092502",
    seq: 2,
    customer: "Trần Văn Minh",
    customerType: "B2C",
    companyName: "",
    phone: "0903 887 766",
    product: "Kệ hoa chia buồn 2 tầng Vĩnh Cửu",
    productId: "prod-2",
    sku: "HV-KE02",
    price: 1500000,
    cost: 950000,
    status: "Chờ duyệt QC (Ảnh tại shop)",
    time: "09:20 25/09",
    fullTimestamp: "2026-09-25T09:20:00",
    district: "Quận 3",
    address: "Tư gia: 142/8 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Q.3, TP.HCM",
    isUrgent: true,
    urgentReason: "Khách yêu cầu có mặt trước lễ Nhập Quan 11:15",
    deliveryDeadline: "11:15 hôm nay",
    minutesLeft: 50,
    deceased: {
      name: "Cố Ông: TRẦN VĂN ĐỨC (Hưởng thọ 78 tuổi)",
      funeralTime: "Lễ Nhập Quan: 11:30 | Động quan: 06:00 ngày mai",
      place: "Tư gia gia đình"
    },
    ribbon: "Tập Thể Cựu Sinh Viên Khóa 2012 ĐH Bách Khoa - Vô Cùng Thương Tiếc",
    ribbonStyle: "Lụa trắng chữ đen tuyền truyền thống",
    assignedPartner: {
      id: "part-1",
      name: "Shop Hoa Tươi Sài Gòn Q.3",
      phone: "0908 111 222",
      address: "148 Võ Thị Sáu, Q.3"
    },
    shipper: null,
    photos: {
      shopPhoto: "/assets/products/prod_2_ke_hoa_2_tang.jpg",
      funeralPhoto: null,
      gpsLocation: null
    },
    qcStatus: "Chờ duyệt",
    paymentStatus: "Đã thanh toán (MBBank VietQR)",
    notes: "Giao trước 11h trưa để kịp giờ nhập quan. Shop vừa upload ảnh cắm xong."
  },
  {
    id: "DH26092503",
    seq: 3,
    customer: "Ngân hàng Vietcombank - CN Tân Bình",
    customerType: "B2B",
    companyName: "Ngân hàng TMCP Ngoại Thương Việt Nam - Chi nhánh Tân Bình",
    phone: "0977 223 344",
    product: "Giỏ hoa lan ly trang nhã kính viếng",
    productId: "prod-3",
    sku: "HV-GH01",
    price: 800000,
    cost: 500000,
    status: "Hoàn tất (POD - Ảnh tại lễ viếng)",
    time: "08:50 25/09",
    fullTimestamp: "2026-09-25T08:50:00",
    district: "Quận 3",
    address: "Chùa Vĩnh Nghiêm, 339 Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM",
    isUrgent: false,
    deliveryDeadline: "Đã hoàn tất",
    minutesLeft: 0,
    deceased: {
      name: "Cụ Bà: HOÀNG THỊ THU (Pháp danh Diệu Tâm)",
      funeralTime: "Tang lễ tại Vãng Sanh Đường Chùa Vĩnh Nghiêm",
      place: "Chùa Vĩnh Nghiêm, Q.3"
    },
    ribbon: "Ban Giám Đốc & Công Đoàn Vietcombank Chi Nhánh Tân Bình - Thành Kính Phân Ưu",
    ribbonStyle: "Lụa xanh sẫm viền kim nhũ",
    assignedPartner: {
      id: "part-1",
      name: "Shop Hoa Tươi Sài Gòn Q.3",
      phone: "0908 111 222"
    },
    shipper: {
      name: "Nguyễn Hoàng Nam",
      phone: "0933 654 321",
      plate: "59H2-341.12",
      deliveredAt: "08:48 25/09"
    },
    photos: {
      shopPhoto: "/assets/products/prod_3_gio_hoa_ly.jpg",
      funeralPhoto: "/assets/products/prod_3_gio_hoa_ly.jpg",
      gpsLocation: "10.7909° N, 106.6834° E (Chùa Vĩnh Nghiêm, 339 Nam Kỳ Khởi Nghĩa)"
    },
    qcStatus: "Đã duyệt",
    qcReviewer: "Trần Thùy Linh (QC)",
    paymentStatus: "Đã thanh toán (MBBank VietQR)",
    notes: "Đã ký biên bản bàn giao và gửi ảnh cho Trợ lý Giám đốc Vietcombank qua Zalo"
  },
  {
    id: "DH26092504",
    seq: 4,
    customer: "Tập đoàn Vingroup (Phòng Hành chính)",
    customerType: "B2B",
    companyName: "Tập Đoàn Vingroup - Công Ty CP",
    phone: "0918 999 111",
    product: "Lan hồ điệp trắng 10 cành đại tang",
    productId: "prod-4",
    sku: "HV-LAN10",
    price: 2000000,
    cost: 1250000,
    status: "Đang cắm hoa",
    time: "08:45 25/09",
    fullTimestamp: "2026-09-25T08:45:00",
    district: "Gò Vấp",
    address: "Nhà tang lễ Bộ Quốc Phòng, 05 Phạm Ngũ Lão, Gò Vấp, TP.HCM",
    isUrgent: true,
    urgentReason: "Đoàn đại biểu lãnh đạo Tập đoàn vào viếng lúc 13:00",
    deliveryDeadline: "12:30 hôm nay",
    minutesLeft: 85,
    deceased: {
      name: "Đại tá Quân đội Nhân dân: NGUYỄN VĂN AN (75 tuổi)",
      funeralTime: "Lễ viếng: 12:30 - 16:00 | Truy điệu: 07:00 ngày 27/09",
      place: "Nhà tang lễ Quốc gia phía Nam (BQP)"
    },
    ribbon: "Chủ Tịch HĐQT & Ban Tổng Giám Đốc Tập Đoàn Vingroup - Kính Điếu",
    ribbonStyle: "Lụa nhung đen thêu chữ vàng kim",
    assignedPartner: {
      id: "part-2",
      name: "Shop Hoa Tươi Tâm An Gò Vấp",
      phone: "0909 333 444",
      address: "88 Quang Trung, Gò Vấp"
    },
    shipper: {
      name: "Lê Anh Tuấn",
      phone: "0909 777 888",
      plate: "59K1-778.90"
    },
    photos: {
      shopPhoto: null,
      funeralPhoto: null,
      gpsLocation: null
    },
    qcStatus: "Chưa có ảnh",
    paymentStatus: "Công nợ Doanh nghiệp (Kỳ 30 ngày)",
    notes: "Chậu lan đại sảnh 10 cành hoa to nở đều, thắt nơ lụa đen trang nghiêm."
  },
  {
    id: "DH26092505",
    seq: 5,
    customer: "Công ty Cổ phần Chứng khoán SSI",
    customerType: "B2B",
    companyName: "Công ty Cổ phần Chứng khoán SSI",
    phone: "0982 555 666",
    product: "Kệ hoa lan vàng hoàng gia kính viếng",
    productId: "prod-2",
    sku: "HV-KE03",
    price: 1800000,
    cost: 1100000,
    status: "Đã nhận & Chuyển đối tác",
    time: "10:15 17/11",
    fullTimestamp: "2026-11-17T03:15:00",
    district: "Bình Tân",
    address: "Nhà tang lễ Trung tâm Bình Hưng Hòa, Bình Tân, TP.HCM",
    isUrgent: false,
    deliveryDeadline: "15:00 hôm nay",
    minutesLeft: 180,
    deceased: {
      name: "Cố Cụ Ông: LÊ VĂN LONG (Hưởng thọ 91 tuổi)",
      funeralTime: "Lễ viếng bắt đầu từ 15:30",
      place: "Linh đường 2 - Nhà tang lễ Bình Hưng Hòa"
    },
    ribbon: "Ban Điều Hành & Tập Thể Nhân Viên SSI - Thành Kính Phân Ưu",
    ribbonStyle: "Lụa vàng chữ đồng trang nghiêm",
    assignedPartner: {
      id: "part-3",
      name: "Điện Hoa An Bình (Bình Hưng Hòa)",
      phone: "0944 888 999",
      address: "12 Bình Long, Bình Tân"
    },
    shipper: null,
    photos: {
      shopPhoto: null,
      funeralPhoto: null,
      gpsLocation: null
    },
    qcStatus: "Chưa có ảnh",
    paymentStatus: "Đã thanh toán (MBBank VietQR)",
    notes: "Đối tác đã nhận lệnh qua Zalo OA, chuẩn bị hoa cúc mẫu đơn và lan vàng."
  },
  {
    id: "DH26092506",
    seq: 6,
    customer: "Phạm Hồng Ngọc",
    customerType: "B2C",
    companyName: "",
    phone: "0903 112 233",
    product: "Vòng Hoa Thánh Giá Đạo Thiên Chúa",
    productId: "prod-9",
    sku: "HV-TG01",
    price: 1500000,
    cost: 950000,
    status: "Chờ xác nhận",
    time: "10:45 17/11",
    fullTimestamp: "2026-11-17T03:45:00",
    district: "Phú Nhuận",
    address: "Giáo xứ Tân Định / Tư gia: 289 Hai Bà Trưng, P.8, Q.3",
    isUrgent: true,
    urgentReason: "Thánh lễ An táng cử hành lúc 14:00",
    deliveryDeadline: "13:00 hôm nay",
    minutesLeft: 110,
    deceased: {
      name: "Linh hồn: GIUSE NGUYỄN VĂN BÌNH",
      funeralTime: "Thánh lễ An táng: 14:00 tại Thánh đường Giáo xứ",
      place: "Giáo xứ Tân Định"
    },
    ribbon: "Gia Đình Các Con Cháu Tại Hải Ngoại - Nguyện Cầu Cho Linh Hồn Giuse Sớm Về Hưởng Nhan Thánh Chúa",
    ribbonStyle: "Lụa tím tím than Đạo Thiên Chúa thêu chữ trắng",
    assignedPartner: null,
    shipper: null,
    photos: {
      shopPhoto: null,
      funeralPhoto: null,
      gpsLocation: null
    },
    qcStatus: "Chưa có ảnh",
    paymentStatus: "Chờ thanh toán (MBBank VietQR)",
    notes: "Đơn mới đặt qua web, cần gọi điện xác nhận và gán cho Shop Q.3 hoặc Phú Nhuận."
  }
];

// 3. Categories with Tree structure & SEO metadata
const categories = [
  {
    id: "cat-1",
    name: "Kệ hoa chia buồn",
    slug: "ke-hoa-chia-buon",
    icon: "fa-solid fa-monument",
    level: 1,
    productCount: 18,
    seo: {
      metaTitle: "Kệ Hoa Tang Lễ Đẹp, Trang Trọng - Giao Hỏa Tốc 60 Phút TP.HCM",
      metaDesc: "Đặt kệ hoa tang lễ 1 tầng, 2 tầng, 3 tầng sang trọng. Hoa tươi 100% tuyển chọn, băng rôn kính viếng trang nghiêm, giao đúng giờ viếng 24/7.",
      urlSlug: "ke-hoa-chia-buon"
    },
    children: [
      { id: "cat-1-1", name: "Kệ hoa 1 tầng thanh nhã", slug: "ke-hoa-1-tang", productCount: 6, level: 2 },
      { id: "cat-1-2", name: "Kệ hoa 2 tầng sang trọng", slug: "ke-hoa-2-tang", productCount: 8, level: 2 },
      { id: "cat-1-3", name: "Kệ hoa 3 tầng đại tang", slug: "ke-hoa-3-tang", productCount: 4, level: 2 }
    ]
  },
  {
    id: "cat-2",
    name: "Vòng hoa truyền thống",
    slug: "vong-hoa-truyen-thong",
    icon: "fa-solid fa-circle-notch",
    level: 1,
    productCount: 12,
    seo: {
      metaTitle: "Vòng Hoa Tang Lễ Truyền Thống Đẹp Nhất - Hoa Viếng Sài Gòn",
      metaDesc: "Mẫu vòng hoa cúc trắng, cúc vàng, hoa lan oval truyền thống viếng đám tang. Thiết kế trang nhã, ý nghĩa tiễn biệt sâu sắc.",
      urlSlug: "vong-hoa-truyen-thong"
    },
    children: [
      { id: "cat-2-1", name: "Vòng hoa cúc trắng tròn", slug: "vong-hoa-cuc-trang", productCount: 5, level: 2 },
      { id: "cat-2-2", name: "Vòng hoa oval cúc lan", slug: "vong-hoa-oval", productCount: 4, level: 2 },
      { id: "cat-2-3", name: "Vòng hoa Thánh Giá Công giáo", slug: "vong-hoa-thanh-gia", productCount: 3, level: 2 }
    ]
  },
  {
    id: "cat-3",
    name: "Giỏ hoa / Lẵng hoa chia buồn",
    slug: "gio-hoa-chia-buon",
    icon: "fa-solid fa-basket-shopping",
    level: 1,
    productCount: 8,
    seo: {
      metaTitle: "Giỏ Hoa, Lẵng Hoa Tang Lễ Để Bàn Nhẹ Nhàng, Ấm Áp",
      metaDesc: "Bộ sưu tập giỏ hoa viếng tang lễ đặt tại linh đường, tư gia. Nhẹ nhàng, trang trọng, hoa tươi bền màu suốt tang kỳ.",
      urlSlug: "gio-hoa-chia-buon"
    },
    children: [
      { id: "cat-3-1", name: "Giỏ hoa lan hồ điệp để bàn", slug: "gio-hoa-de-ban", productCount: 4, level: 2 },
      { id: "cat-3-2", name: "Lẵng hoa ly trắng & cúc", slug: "lang-hoa-ly-trang", productCount: 4, level: 2 }
    ]
  },
  {
    id: "cat-4",
    name: "Lan hồ điệp viếng cao cấp",
    slug: "lan-ho-diep-vieng",
    icon: "fa-solid fa-spa",
    level: 1,
    productCount: 6,
    seo: {
      metaTitle: "Chậu Lan Hồ Điệp Trắng Viếng Đám Tang Cao Cấp - Tinh Tế & Bền Lâu",
      metaDesc: "Chậu lan hồ điệp trắng từ 5 đến 20 cành viếng tang lễ doanh nhân, đại biểu. Độ bền từ 3-4 tuần, thể hiện lòng kính trọng tột bậc.",
      urlSlug: "lan-ho-diep-vieng"
    },
    children: [
      { id: "cat-4-1", name: "Chậu lan 5 cành trang nhã", slug: "lan-5-canh", productCount: 2, level: 2 },
      { id: "cat-4-2", name: "Chậu lan 10 cành bề thế", slug: "lan-10-canh", productCount: 2, level: 2 },
      { id: "cat-4-3", name: "Chậu lan đại sảnh 20 cành", slug: "lan-20-canh", productCount: 2, level: 2 }
    ]
  }
];

// 4. Customers (B2C & B2B)
const customers = [
  {
    id: "cust-1",
    name: "Ngân hàng Vietcombank - CN Tân Bình",
    type: "B2B",
    phone: "0977 223 344",
    email: "hcns.tanbinh@vietcombank.com.vn",
    ordersCount: 26,
    totalSpent: 48500000,
    tier: "Đối Tác Kim Cương B2B",
    ribbonTemplates: [
      "Ban Giám Đốc & Công Đoàn Vietcombank Chi Nhánh Tân Bình - Thành Kính Phân Ưu",
      "Tập Thể Cán Bộ Nhân Viên Phòng Giao Dịch - Kính Viếng",
      "Chi Bộ Đảng Vietcombank Tân Bình - Vô Cùng Thương Tiếc"
    ],
    taxInfo: {
      companyName: "Ngân Hàng TMCP Ngoại Thương Việt Nam - Chi Nhánh Tân Bình",
      taxId: "0100150619-042",
      address: "108 Xuân Diệu, Phường 4, Quận Tân Bình, TP.HCM",
      einvoiceEmail: "hoadondientu@vietcombank.com.vn"
    }
  },
  {
    id: "cust-2",
    name: "Tập Đoàn Vingroup",
    type: "B2B",
    phone: "0918 999 111",
    email: "admin.south@vingroup.net",
    ordersCount: 42,
    totalSpent: 96000000,
    tier: "Khách Hàng Chiến Lược",
    ribbonTemplates: [
      "Chủ Tịch HĐQT & Ban Tổng Giám Đốc Tập Đoàn Vingroup - Kính Điếu",
      "Ban Lãnh Đạo & Toàn Thể Cán Bộ Nhân Viên Vingroup - Thành Kính Phân Ưu"
    ],
    taxInfo: {
      companyName: "Tập Đoàn Vingroup - Công Ty CP",
      taxId: "0101245486",
      address: "Số 7, Đường Bằng Lăng 1, KĐT Vinhomes Riverside, Long Biên, Hà Nội",
      einvoiceEmail: "accounting.einvoice@vingroup.net"
    }
  },
  {
    id: "cust-3",
    name: "Công ty Cổ phần Chứng khoán SSI",
    type: "B2B",
    phone: "0982 555 666",
    email: "contact@ssi.com.vn",
    ordersCount: 18,
    totalSpent: 32400000,
    tier: "Đối Tác VIP",
    ribbonTemplates: [
      "Ban Điều Hành & Tập Thể Nhân Viên SSI - Thành Kính Phân Ưu",
      "Khối Dịch Vụ Chứng Khoán SSI - Kính Viếng"
    ],
    taxInfo: {
      companyName: "Công ty Cổ phần Chứng khoán SSI",
      taxId: "0301449033",
      address: "72 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
      einvoiceEmail: "tax@ssi.com.vn"
    }
  },
  {
    id: "cust-4",
    name: "Nguyễn Thị Lan",
    type: "B2C",
    phone: "0912 345 678",
    email: "lan.nguyen@gmail.com",
    ordersCount: 3,
    totalSpent: 3600000,
    tier: "Khách Hàng Thân Thiết",
    ribbonTemplates: [
      "Gia đình Cháu Lan - Kính Viếng Hương Hồn Bác",
      "Bạn bè thân hữu - Thành Kính Chia Buồn"
    ],
    taxInfo: null
  },
  {
    id: "cust-5",
    name: "Trần Văn Minh",
    type: "B2C",
    phone: "0903 887 766",
    email: "minh.tran@techcorp.vn",
    ordersCount: 2,
    totalSpent: 2700000,
    tier: "Khách Mới",
    ribbonTemplates: [
      "Tập Thể Cựu Sinh Viên Khóa 2012 ĐH Bách Khoa - Vô Cùng Thương Tiếc"
    ],
    taxInfo: null
  }
];

// 5. Shop Florist Partners
const partners = [
  {
    id: "part-1",
    name: "Shop Hoa Tươi Sài Gòn Q.3",
    manager: "Chị Ánh Tuyết",
    phone: "0908 111 222",
    districts: ["Quận 3", "Quận 1", "Quận 10", "Phú Nhuận"],
    rating: 4.9,
    successRate: 99.4,
    qcErrorRate: 0.4,
    activeOrders: 2,
    totalOrdersHandled: 418,
    status: "Đang mở cửa",
    leadTime: "45-60 phút",
    address: "148 Võ Thị Sáu, Phường Võ Thị Sáu, Q.3, TP.HCM"
  },
  {
    id: "part-2",
    name: "Shop Hoa Tươi Tâm An Gò Vấp",
    manager: "Anh Quang Huy",
    phone: "0909 333 444",
    districts: ["Gò Vấp", "Quận 12", "Tân Bình"],
    rating: 4.8,
    successRate: 98.7,
    qcErrorRate: 0.9,
    activeOrders: 1,
    totalOrdersHandled: 295,
    status: "Đang mở cửa",
    leadTime: "60-75 phút",
    address: "88 Quang Trung, Phường 10, Gò Vấp, TP.HCM"
  },
  {
    id: "part-3",
    name: "Điện Hoa An Bình (Bình Hưng Hòa)",
    manager: "Chị Bích Thủy",
    phone: "0944 888 999",
    districts: ["Bình Tân", "Tân Phú", "Bình Chánh"],
    rating: 4.95,
    successRate: 99.8,
    qcErrorRate: 0.2,
    activeOrders: 3,
    totalOrdersHandled: 560,
    status: "Đang mở cửa (Trực 24/7)",
    leadTime: "30-45 phút",
    address: "12 Bình Long, Phường Bình Hưng Hòa A, Bình Tân, TP.HCM"
  },
  {
    id: "part-4",
    name: "Hoa Tươi Thanh Nhã Bình Thạnh",
    manager: "Anh Hoàng Phúc",
    phone: "0938 777 666",
    districts: ["Bình Thạnh", "Thủ Đức", "Quận 2"],
    rating: 4.75,
    successRate: 97.9,
    qcErrorRate: 1.5,
    activeOrders: 1,
    totalOrdersHandled: 184,
    status: "Đang mở cửa",
    leadTime: "60 phút",
    address: "245 Bạch Đằng, Phường 15, Bình Thạnh, TP.HCM"
  }
];

// 6. Delivery Shippers & Routes
const deliveryShippers = [
  {
    id: "ship-1",
    name: "Trần Quốc Bảo",
    phone: "0988 123 456",
    plate: "59F1-889.24",
    orderId: "DH26092501",
    destination: "Nhà tang lễ TP.HCM, 25 Lê Quý Đôn, Q.3",
    etaMinutes: 25,
    statusColor: "red", // Danger: < 30 mins
    statusText: "Gấp! Còn 25 phút đến giờ viếng",
    lat: 10.7785,
    lng: 106.6912
  },
  {
    id: "ship-2",
    name: "Nguyễn Hoàng Nam",
    phone: "0933 654 321",
    plate: "59H2-341.12",
    orderId: "DH26092503",
    destination: "Chùa Vĩnh Nghiêm, 339 Nam Kỳ Khởi Nghĩa, Q.3",
    etaMinutes: 0,
    statusColor: "green",
    statusText: "Đã giao thành công (POD verified)",
    lat: 10.7909,
    lng: 106.6834
  },
  {
    id: "ship-3",
    name: "Lê Anh Tuấn",
    phone: "0909 777 888",
    plate: "59K1-778.90",
    orderId: "DH26092504",
    destination: "Nhà tang lễ BQP, 05 Phạm Ngũ Lão, Gò Vấp",
    etaMinutes: 50,
    statusColor: "yellow", // Warning: 30-60 mins
    statusText: "Còn 50 phút đến điểm viếng",
    lat: 10.8256,
    lng: 106.6845
  }
];

// 7. QC Gallery Queue
const qcQueue = [
  {
    id: "qc-1",
    orderId: "DH26092502",
    customer: "Trần Văn Minh",
    product: "Kệ hoa chia buồn 2 tầng Vĩnh Cửu",
    partnerName: "Shop Hoa Tươi Sài Gòn Q.3",
    timeSent: "09:40 hôm nay",
    sampleImage: "/assets/products/prod_2_ke_hoa_2_tang.jpg",
    actualImage: "/assets/products/prod_2_ke_hoa_2_tang.jpg",
    ribbonText: "Tập Thể Cựu Sinh Viên Khóa 2012 ĐH Bách Khoa - Vô Cùng Thương Tiếc",
    status: "Chờ duyệt",
    issues: []
  },
  {
    id: "qc-2",
    orderId: "DH26092501",
    customer: "Nguyễn Thị Lan",
    product: "Vòng hoa cúc trắng dạng tròn tiễn biệt",
    partnerName: "Shop Hoa Tươi Sài Gòn Q.3",
    timeSent: "09:15 hôm nay",
    sampleImage: "/assets/products/prod_1_cuc_trang_tien_biet.jpg",
    actualImage: "/assets/products/prod_1_cuc_trang_tien_biet.jpg",
    ribbonText: "Ban Giám Đốc Công Ty Cổ Phần Công Nghệ ABC - Thành Kính Phân Ưu",
    status: "Đã duyệt cho đi giao",
    issues: []
  }
];

// 8. Payouts (Florist Reconciliation)
const payouts = [
  {
    id: "pay-1",
    period: "Kỳ tuần 2 / Tháng 11 (07/11 - 14/11)",
    partnerId: "part-1",
    partnerName: "Shop Hoa Tươi Sài Gòn Q.3",
    ordersCount: 38,
    grossRevenue: 52000000,
    commissionRate: "20%",
    commissionAmount: 10400000,
    penalties: 0,
    penaltyReason: "Không có lỗi",
    netPayout: 41600000,
    status: "Đã chuyển khoản quyết toán"
  },
  {
    id: "pay-2",
    period: "Kỳ tuần 2 / Tháng 11 (07/11 - 14/11)",
    partnerId: "part-3",
    partnerName: "Điện Hoa An Bình (Bình Hưng Hòa)",
    ordersCount: 52,
    grossRevenue: 78000000,
    commissionRate: "20%",
    commissionAmount: 15600000,
    penalties: 0,
    penaltyReason: "Không có lỗi",
    netPayout: 62400000,
    status: "Đã chuyển khoản quyết toán"
  },
  {
    id: "pay-3",
    period: "Kỳ tuần 2 / Tháng 11 (07/11 - 14/11)",
    partnerId: "part-2",
    partnerName: "Shop Hoa Tươi Tâm An Gò Vấp",
    ordersCount: 22,
    grossRevenue: 31000000,
    commissionRate: "20%",
    commissionAmount: 6200000,
    penalties: 200000,
    penaltyReason: "1 đơn giao trễ 15p so với hẹn giờ viếng",
    netPayout: 24600000,
    status: "Chờ kế toán phê duyệt"
  }
];

// 9. Promotions & B2B Rules
const promotions = {
  vouchers: [
    { code: "HOAVIENG10", discount: "Giảm 10%", maxDiscount: "200.000đ", minOrder: "1.200.000đ", used: 142, limit: 500, expiry: "31/12/2026", status: "Đang áp dụng" },
    { code: "B2BVIP2026", discount: "Giảm 15%", maxDiscount: "1.000.000đ", minOrder: "5.000.000đ", used: 38, limit: 100, expiry: "31/12/2026", status: "Dành riêng B2B" },
    { code: "TRIAN200K", discount: "Trừ 200.000đ", maxDiscount: "200.000đ", minOrder: "2.000.000đ", used: 89, limit: 300, expiry: "30/11/2026", status: "Đang áp dụng" }
  ],
  b2bTierDiscounts: [
    { tier: "Mua từ 3 đến 4 kệ/vòng", discount: "Giảm 5% trực tiếp trên hóa đơn", notes: "Áp dụng cho doanh nghiệp đặt phúng điếu theo đoàn" },
    { tier: "Mua từ 5 đến 9 kệ/vòng", discount: "Giảm 10% + Miễn phí vận chuyển toàn TP.HCM", notes: "Tặng kèm băng rôn lụa thêu logo công ty" },
    { tier: "Mua từ 10 kệ trở lên", discount: "Giảm 15% + Hợp đồng công nợ 30 ngày", notes: "Xuất HĐĐT VAT ngay trong ngày" }
  ],
  shippingRules: {
    freeRadiusKm: 5,
    ratePerExtraKm: 5000,
    expressSurge: 50000 // Giao hỏa tốc 60 phút
  }
};

// 10. Reports & Analytics
const reports = {
  flowerProfitMargin: [
    { type: "Lan hồ điệp cao cấp", margin: 48.5, revenue: 170000000, profit: 82450000 },
    { type: "Kệ hoa chia buồn 2-3 tầng", margin: 42.0, revenue: 349800000, profit: 146916000 },
    { type: "Vòng hoa cúc lan truyền thống", margin: 37.5, revenue: 249600000, profit: 93600000 },
    { type: "Giỏ hoa / Lẵng hoa để bàn", margin: 35.0, revenue: 64000000, profit: 22400000 }
  ],
  partnerCancellationRates: [
    { partner: "Điện Hoa An Bình (Bình Hưng Hòa)", orders: 560, cancelled: 1, rate: 0.18, rank: "Xuất Sắc" },
    { partner: "Shop Hoa Tươi Sài Gòn Q.3", orders: 418, cancelled: 2, rate: 0.48, rank: "Xuất Sắc" },
    { partner: "Shop Hoa Tươi Tâm An Gò Vấp", orders: 295, cancelled: 3, rate: 1.02, rank: "Khá" },
    { partner: "Hoa Tươi Thanh Nhã Bình Thạnh", orders: 184, cancelled: 3, rate: 1.63, rank: "Cần cải thiện" }
  ],
  marketingChannels: [
    { channel: "Khách B2B Doanh nghiệp quay lại", share: 44.5, orders: 556, roi: "Tối ưu nhất (CAC ~ 0đ)" },
    { channel: "Tìm kiếm tự nhiên Google (SEO)", share: 28.2, orders: 352, roi: "Rất cao" },
    { channel: "Google Ads (Từ khóa: hoa viếng, hoa tang lễ)", share: 19.3, orders: 241, roi: "3.8x" },
    { channel: "Hotline giới thiệu trực tiếp", share: 8.0, orders: 99, roi: "Cao" }
  ]
};

// 11. Condolence Library (Mẫu câu chia buồn gợi ý)
const condolenceLibrary = [
  {
    category: "Phật giáo / Dân gian truyền thống",
    templates: [
      "Vô Cùng Thương Tiếc Tiễn Biệt Cụ - Nguyện Cầu Hương Linh Vãng Sanh Về Miền Cực Lạc",
      "Thành Kính Phân Ưu Cùng Gia Đình Tang Quyến - Nam Mô A Di Đà Phật",
      "Kính Viếng Hương Hồn Bác - Nguyện Hương Hồn Tiêu Diêu Nơi Miền Cực Lạc",
      "Gia Đình [Tên Bạn] - Thành Kính Kính Điếu"
    ]
  },
  {
    category: "Công giáo (Đạo Thiên Chúa)",
    templates: [
      "Nguyện Xin Thiên Chúa Đón Nhận Linh Hồn [Tên Thánh/Họ Tên] Vào Nước Thiên Đàng",
      "Thành Kính Phân Ưu - Nguyện Chúa Ban Ơn Bình An Và Nâng Đỡ Tang Quyến Trong Cơn Thử Thách",
      "Hiệp Thông Cầu Nguyện Cho Linh Hồn [Tên Thánh] Sớm Hưởng Nhan Thánh Chúa",
      "Kính Viếng Linh Hồn [Tên Thánh] - Chúa Là Sự Sống Lại Và Là Sự Sống"
    ]
  },
  {
    category: "Doanh nghiệp & Cơ quan đoàn thể",
    templates: [
      "Ban Giám Đốc & Toàn Thể Cán Bộ Nhân Viên [Tên Công Ty] - Thành Kính Phân Ưu",
      "Chủ Tịch Hội Đồng Quản Trị & Ban Lãnh Đạo [Tên Doanh Nghiệp] - Kính Viếng",
      "Tập Thể Đồng Nghiệp Công Ty [Tên Công Ty] - Vô Cùng Thương Tiếc Và Chia Buồn Cùng Gia Đình",
      "Chi Bộ & Ban Chấp Hành Công Đoàn [Tên Đơn Vị] - Thành Kính Kính Điếu"
    ]
  },
  {
    category: "Bạn bè & Bạn học thân hữu",
    templates: [
      "Tập Thể Cựu Sinh Viên Khóa [Năm] Trường [Tên Trường] - Vô Cùng Thương Tiếc Tiễn Biệt Bạn",
      "Nhóm Bạn Thân Thời Niên Thiếu - Mãi Mãi Nhớ Về Bạn, An Nghỉ Bạn Nhé",
      "Các Bạn Đồng Môn - Thành Kính Tiễn Bạn Về Miền Mây Trắng"
    ]
  }
];

// 12. Users (RBAC) & Audit Logs
const users = [
  { id: "usr-1", name: "Nguyễn Văn Hưng", email: "admin@hoavieng.vn", role: "Admin Tổng", status: "Online", avatar: "/assets/concept_backend.jpg" },
  { id: "usr-2", name: "Lê Minh Trí", email: "dispatch@hoavieng.vn", role: "Điều phối viên (CSKH)", status: "Online", avatar: "/assets/concept_backend.jpg" },
  { id: "usr-3", name: "Trần Thùy Linh", email: "qc@hoavieng.vn", role: "Nhân viên duyệt QC", status: "Online", avatar: "/assets/concept_backend.jpg" },
  { id: "usr-4", name: "Hoàng Mai Phương", email: "finance@hoavieng.vn", role: "Kế toán đối soát", status: "Away", avatar: "/assets/concept_backend.jpg" }
];

const auditLogs = [
  { id: "log-1", user: "Trần Thùy Linh (QC)", action: "Duyệt ảnh QC", details: "Duyệt ảnh thành phẩm đơn #DH26092501 (Chuẩn 100%)", time: "09:32 hôm nay" },
  { id: "log-2", user: "Lê Minh Trí (Điều phối)", action: "Gán đơn đối tác", details: "Đẩy đơn #DH26092505 cho Điện Hoa An Bình (Bình Hưng Hòa) qua Zalo OA", time: "10:16 hôm nay" },
  { id: "log-3", user: "Hoàng Mai Phương (Kế toán)", action: "Khớp tiền MBBank", details: "Khớp đối soát thanh toán 1.200.000đ cho đơn #ĐH26113061 qua STK MBBank 0966789639", time: "10:59 hôm nay" },
  { id: "log-4", user: "Lê Minh Trí (Điều phối)", action: "Sửa nội dung băng rôn", details: "Chỉnh sửa chính tả tên người mất cho đơn #DH26092502", time: "09:25 hôm nay" },
  { id: "log-5", user: "Nguyễn Văn Hưng (Admin)", action: "Cập nhật cấu hình", details: "Điều chỉnh ngưỡng cảnh báo đơn gấp từ 90 phút xuống 60 phút", time: "08:10 hôm nay" }
];

// 13. System Settings
const settings = {
  general: {
    shopName: "HOA VIẾNG - Dịch Vụ Hoa Tang Lễ Chuyên Nghiệp",
    hotline: "0868 57 67 77 (Trực 24/7)",
    email: "info@hoavieng.vn",
    headquarters: "123 Nguyễn Văn Cừ, Quận 1, TP.HCM",
    leadTimeMinutes: 60,
    urgentThresholdMinutes: 90
  },
  delivery: {
    baseRadiusKm: 5,
    baseFee: 0,
    extraFeePerKm: 5000,
    expressFee: 50000
  },
  webhooks: {
    zaloZns: {
      enabled: true,
      appId: "389274921094",
      secretKey: "••••••••••••••••",
      templateOrderSuccess: "TMP_ZNS_HOAVIENG_01",
      templateQCApproved: "TMP_ZNS_HOAVIENG_02",
      status: "Đang kết nối (Active)"
    },
    telegramAlert: {
      enabled: true,
      botToken: "712938472:AAH••••••••••••••••",
      chatId: "-100234857291 (Kênh Điều Phối Đơn Gấp)",
      status: "Đang kết nối (Active)"
    },
    sepayVietQr: {
      enabled: true,
      bank: "MBBank (Ngân hàng TMCP Quân Đội)",
      accountNumber: "0966789639",
      accountName: "HOA VIENG",
      webhookUrl: "http://localhost:2000/api/webhooks/vietqr",
      status: "Đang kết nối Napas247 (Active)"
    }
  }
};

// Preserve existing products and articles, enrich products with cost, sku, tags, variants, ingredients
const enrichedProducts = (existing.products || []).map((p, idx) => {
  return {
    ...p,
    sku: p.sku || `HV-${p.category === 'vong-hoa' ? 'VH' : (p.category === 'lan-ho-diep' ? 'LAN' : 'KE')}${String(idx + 1).padStart(2, '0')}`,
    cost: p.cost || Math.round(p.price * 0.62),
    displayStatus: p.displayStatus !== undefined ? p.displayStatus : true,
    tags: p.tags || [
      idx % 2 === 0 ? "Phật giáo" : "Công giáo",
      p.price >= 1800000 ? "Trang trọng cao cấp" : "Khai trương chia buồn"
    ],
    variants: p.variants || [
      { name: "Tiêu chuẩn (Tông Trắng)", price: p.price, cost: Math.round(p.price * 0.62) },
      { name: "Cao cấp (Tông Trắng - Vàng)", price: p.price + 300000, cost: Math.round((p.price + 300000) * 0.62) },
      { name: "Đại lễ VIP (Tông Trắng - Tím)", price: p.price + 700000, cost: Math.round((p.price + 700000) * 0.62) }
    ],
    ingredients: p.ingredients || [
      { name: "Hoa cúc trắng / lan trắng", qty: "Đầy đặn", status: "Đủ nguồn cung" },
      { name: "Lan hồ điệp tuyển chọn", qty: "6-10 cành", status: "Đủ nguồn cung" },
      { name: "Lá đệm cau, thiết mộc lan", qty: "Tươi mới", status: "Sẵn sàng" }
    ]
  };
});

const mergedData = {
  stats,
  orders,
  products: enrichedProducts,
  categories,
  customers,
  partners,
  deliveryShippers,
  qcQueue,
  payouts,
  promotions,
  reports,
  condolenceLibrary,
  users,
  auditLogs,
  settings,
  activities: existing.activities || [],
  reviews: existing.reviews || [],
  articles: existing.articles || []
};

fs.writeFileSync(dataFile, JSON.stringify(mergedData, null, 2), 'utf8');
console.log("Database successfully upgraded with 5 operational pillars!");
