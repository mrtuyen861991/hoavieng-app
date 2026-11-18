const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Anti-cache headers for HTML pages
app.use((req, res, next) => {
  if (req.method === 'GET' && (req.path === '/' || req.path.endsWith('.html') || !req.path.includes('.'))) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
  }
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Database file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Helper to read data safely
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data.json:', err);
    return {
      stats: {},
      products: [],
      orders: [],
      categories: [],
      customers: [],
      partners: [],
      deliveryShippers: [],
      qcQueue: [],
      payouts: [],
      promotions: {},
      reports: {},
      condolenceLibrary: [],
      users: [],
      auditLogs: [],
      settings: {},
      activities: [],
      reviews: [],
      articles: []
    };
  }
}

// Helper to write data safely
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing data.json:', err);
    return false;
  }
}

// ================= API ENDPOINTS ================= //

// 1. Get Dashboard Stats & KPIs
app.get('/api/stats', (req, res) => {
  const data = readData();
  const orders = data.orders || [];
  
  const urgentOrders = orders.filter(o => o.isUrgent && o.status !== 'Hoàn tất (POD - Ảnh tại lễ viếng)' && o.status !== 'Hủy');
  const qcPending = orders.filter(o => o.qcStatus === 'Chờ duyệt' || (o.isUrgent && (!o.photos || !o.photos.shopPhoto)));
  
  const b2bOrders = orders.filter(o => o.customerType === 'B2B');
  const b2bRevenue = b2bOrders.reduce((sum, o) => sum + (o.price || 0), 0);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);

  res.json({
    success: true,
    ...(data.stats || {}),
    ordersToday: orders.length,
    urgentOrdersCount: urgentOrders.length,
    urgentList: urgentOrders,
    qcPendingCount: qcPending.length,
    qcAlerts: qcPending,
    b2bRevenueRealtime: b2bRevenue,
    totalRevenueRealtime: totalRevenue,
    hourlyRevenue: data.stats.hourlyRevenue || [],
    topProducts: data.stats.topProducts || []
  });
});

// 2. Products API (Catalog)
app.get('/api/products', (req, res) => {
  const data = readData();
  const { category, search, tag } = req.query;
  let items = data.products || [];

  if (category && category !== 'all') {
    items = items.filter(p => p.category === category);
  }
  if (tag) {
    items = items.filter(p => p.tags && p.tags.includes(tag));
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.sku && p.sku.toLowerCase().includes(q)) ||
      p.tagline.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: items.length, products: items });
});

app.post('/api/products', (req, res) => {
  const data = readData();
  const isBestSeller = req.body.isBestSeller === true || req.body.isBestSeller === 'true';
  const orderCount = parseInt(req.body.orderCount, 10) || (isBestSeller ? 120 : 0);
  const newProduct = {
    id: 'prod-' + (data.products.length + 1),
    sku: req.body.sku || `HV-NEW${String(data.products.length + 1).padStart(2, '0')}`,
    name: req.body.name || 'Mẫu hoa viếng mới',
    tagline: req.body.tagline || 'Trang trọng, thành kính',
    price: parseInt(req.body.price, 10) || 1200000,
    cost: parseInt(req.body.cost, 10) || 750000,
    priceDisplay: `Từ ${(parseInt(req.body.price, 10) || 1200000).toLocaleString('vi-VN')}đ`,
    image: req.body.image || '/assets/prod_vonghoa.jpg',
    category: req.body.category || 'ke-hoa',
    tags: req.body.tags || ['Phật giáo', 'Trang trọng cao cấp'],
    isBestSeller: isBestSeller,
    orderCount: orderCount,
    variants: req.body.variants || [
      { name: 'Tiêu chuẩn (Tông Trắng)', price: parseInt(req.body.price, 10) || 1200000, cost: parseInt(req.body.cost, 10) || 750000 }
    ],
    ingredients: req.body.ingredients || [
      { name: 'Hoa cúc trắng Đà Lạt', qty: 'Đầy đặn', status: 'Đủ nguồn cung' },
      { name: 'Lan Mokara trắng', qty: '10 cành', status: 'Đủ nguồn cung' }
    ],
    displayStatus: req.body.displayStatus !== undefined ? req.body.displayStatus : true,
    description: req.body.description || 'Sản phẩm hoa chia buồn cao cấp được thiết kế tinh tế và trang nghiêm.',
    rating: 5.0,
    deliveryTime: 'Giao trong 60-90 phút'
  };

  data.products.push(newProduct);

  if (!data.auditLogs) data.auditLogs = [];
  data.auditLogs.unshift({
    id: 'log-' + Date.now(),
    user: 'Admin Quản trị viên',
    action: 'Thêm mẫu hoa mới',
    details: `Thêm [${newProduct.name}] (${newProduct.sku}) - ${newProduct.priceDisplay}${isBestSeller ? ' [🔥 Đặt nhiều nhất]' : ''}`,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay'
  });

  writeData(data);
  res.status(201).json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const data = readData();
  const index = data.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
  }

  const prod = data.products[index];

  // Kiểm tra nếu có thay đổi trạng thái Đặt nhiều nhất
  if (req.body.isBestSeller !== undefined) {
    const newStatus = req.body.isBestSeller === true || req.body.isBestSeller === 'true';
    if (prod.isBestSeller !== newStatus) {
      if (!data.auditLogs) data.auditLogs = [];
      data.auditLogs.unshift({
        id: 'log-' + Date.now(),
        user: 'Admin Quản trị viên',
        action: newStatus ? 'Bật [🔥 Đặt nhiều nhất]' : 'Tắt [🔥 Đặt nhiều nhất]',
        details: `${newStatus ? 'Gắn huy hiệu 🔥 Đặt nhiều nhất & ưu tiên hiển thị Trang chủ' : 'Hủy huy hiệu 🔥 Đặt nhiều nhất'} cho mẫu [${prod.name}] (${prod.sku || prod.id})`,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay'
      });
    }
    req.body.isBestSeller = newStatus;
  }

  if (req.body.orderCount !== undefined) {
    req.body.orderCount = parseInt(req.body.orderCount, 10) || 0;
  }

  data.products[index] = { ...data.products[index], ...req.body };
  writeData(data);
  res.json({ success: true, product: data.products[index] });
});

// 3. Orders API with 6-stage workflow and filters
app.get('/api/orders', (req, res) => {
  const data = readData();
  const { status, search, urgent, district, customerType } = req.query;
  let list = [...(data.orders || [])];

  if (status && status !== 'all') {
    list = list.filter(o => o.status === status);
  }
  if (urgent === 'true') {
    list = list.filter(o => o.isUrgent);
  }
  if (district && district !== 'all') {
    list = list.filter(o => o.district === district);
  }
  if (customerType && customerType !== 'all') {
    list = list.filter(o => o.customerType === customerType);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(o => 
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      (o.companyName && o.companyName.toLowerCase().includes(q)) ||
      o.product.toLowerCase().includes(q) ||
      (o.phone && o.phone.includes(q)) ||
      (o.address && o.address.toLowerCase().includes(q)) ||
      (o.ribbon && o.ribbon.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: list.length, orders: list });
});

app.get('/api/orders/:id', (req, res) => {
  const data = readData();
  const order = (data.orders || []).find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }
  res.json({ success: true, order });
});

// Update Order Workflow (6 Steps)
app.put('/api/orders/:id/workflow', (req, res) => {
  const data = readData();
  const index = data.orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }

  const order = data.orders[index];
  const oldStatus = order.status;
  const { status, photos, ribbon, deceased, assignedPartner, shipper, qcStatus } = req.body;

  if (status) order.status = status;
  if (photos) order.photos = { ...(order.photos || {}), ...photos };
  if (ribbon) order.ribbon = ribbon;
  if (deceased) order.deceased = { ...(order.deceased || {}), ...deceased };
  if (assignedPartner) order.assignedPartner = assignedPartner;
  if (shipper) order.shipper = shipper;
  if (qcStatus) order.qcStatus = qcStatus;

  // Log audit
  const log = {
    id: 'log-' + Date.now(),
    user: req.body.operator || 'Điều phối viên',
    action: `Cập nhật trạng thái`,
    details: `Đơn #${order.id} chuyển từ [${oldStatus}] sang [${order.status}]`,
    time: new Date().toLocaleTimeString('vi-VN') + ' hôm nay'
  };
  if (!data.auditLogs) data.auditLogs = [];
  data.auditLogs.unshift(log);

  // Activity feed
  data.activities.unshift({
    id: 'act-' + Date.now(),
    type: 'workflow_update',
    orderId: order.id,
    title: `Đơn #${order.id}`,
    description: `Trạng thái: ${order.status}`,
    timeAgo: 'Vừa xong',
    icon: 'truck',
    badgeColor: order.status.includes('Hoàn tất') ? 'green' : 'blue'
  });

  writeData(data);
  res.json({ success: true, order, message: `Đã cập nhật trạng thái đơn #${order.id} thành công!` });
});

// Assign partner to order
app.put('/api/orders/:id/assign', (req, res) => {
  const data = readData();
  const index = data.orders.findIndex(o => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }

  const { partnerId } = req.body;
  const partner = (data.partners || []).find(p => p.id === partnerId);
  if (!partner) {
    return res.status(400).json({ success: false, message: 'Đối tác không hợp lệ' });
  }

  data.orders[index].assignedPartner = {
    id: partner.id,
    name: partner.name,
    phone: partner.phone,
    address: partner.address
  };
  data.orders[index].status = 'Đã nhận & Chuyển đối tác';

  // Audit log
  data.auditLogs.unshift({
    id: 'log-' + Date.now(),
    user: 'Lê Minh Trí (Điều phối)',
    action: 'Gán đơn đối tác',
    details: `Đẩy đơn #${data.orders[index].id} cho [${partner.name}] qua Zalo OA`,
    time: new Date().toLocaleTimeString('vi-VN') + ' hôm nay'
  });

  writeData(data);
  res.json({ success: true, order: data.orders[index], partner });
});

// Frontend Checkout Order Creation
app.post('/api/orders', (req, res) => {
  const data = readData();
  const orderId = 'ĐH' + (new Date().getFullYear().toString().slice(-2)) + (new Date().getMonth() + 1).toString().padStart(2, '0') + Math.floor(1000 + Math.random() * 9000);
  
  const now = new Date();
  const timeFormatted = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}`;

  const newOrder = {
    id: orderId,
    seq: (data.orders.length + 1),
    customer: req.body.customer || 'Khách viếng đám tang',
    customerType: req.body.customerType || 'B2C',
    companyName: req.body.companyName || '',
    phone: req.body.phone || '0903 xxx xxx',
    product: req.body.product || 'Vòng hoa kính viếng',
    productId: req.body.productId || 'prod-1',
    sku: req.body.sku || 'HV-VH01',
    price: parseInt(req.body.price, 10) || 1200000,
    cost: Math.round((parseInt(req.body.price, 10) || 1200000) * 0.62),
    status: 'Chờ xác nhận',
    time: timeFormatted,
    fullTimestamp: now.toISOString(),
    district: req.body.district || 'Quận 3',
    address: req.body.address || 'Giao tận nơi theo yêu cầu',
    isUrgent: req.body.isUrgent || false,
    deliveryDeadline: req.body.deliveryDeadline || 'Trong 90 phút',
    minutesLeft: 90,
    deceased: {
      name: req.body.deceasedName || 'Người quá cố',
      funeralTime: req.body.funeralTime || 'Lễ viếng tang lễ',
      place: req.body.address || 'Nhà tang lễ'
    },
    ribbon: req.body.ribbon || 'Thành Kính Phân Ưu',
    ribbonStyle: 'Lụa đen viền vàng sang trọng',
    assignedPartner: null,
    shipper: null,
    photos: { shopPhoto: null, funeralPhoto: null, gpsLocation: null },
    qcStatus: 'Chưa có ảnh',
    paymentStatus: req.body.paymentStatus || (req.body.paymentMethod === 'cod' ? 'Chờ thanh toán (COD)' : 'Chờ thanh toán (MBBank VietQR)'),
    bankInfo: {
      bank: 'MBBank',
      bankName: 'Ngân hàng TMCP Quân Đội',
      accountNumber: '0966789639',
      accountName: 'HOA VIENG',
      memo: `HV${orderId}`
    },
    notes: req.body.notes || 'Giao hoa trang trọng, đúng giờ.'
  };

  data.orders.unshift(newOrder);

  data.activities.unshift({
    id: 'act-' + Date.now(),
    type: 'new_order',
    orderId: newOrder.id,
    title: `Đơn #${newOrder.id}`,
    description: `Khách đặt: ${newOrder.product} - ${newOrder.customer}`,
    timeAgo: 'Vừa xong',
    icon: 'cart',
    badgeColor: 'blue'
  });

  writeData(data);
  res.status(201).json({ success: true, order: newOrder, message: 'Đặt hoa thành công!' });
});

// Confirm Payment
app.put('/api/orders/:id/payment', (req, res) => {
  const data = readData();
  const orderIndex = data.orders.findIndex(o => o.id === req.params.id);

  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
  }

  const o = data.orders[orderIndex];
  o.paymentStatus = req.body.paymentStatus || 'Đã thanh toán (MBBank VietQR)';
  o.paidAt = new Date().toISOString();

  data.activities.unshift({
    id: 'act-' + Date.now(),
    type: 'payment_received',
    orderId: req.params.id,
    title: `Đơn #${req.params.id}`,
    description: `Đã khớp thanh toán MBBank 0966789639: ${(o.price || 0).toLocaleString('vi-VN')}đ`,
    timeAgo: 'Vừa xong',
    icon: 'credit-card',
    badgeColor: 'green'
  });

  data.auditLogs.unshift({
    id: 'log-' + Date.now(),
    user: 'Hoàng Mai Phương (Kế toán)',
    action: 'Khớp tiền MBBank',
    details: `Khớp đối soát ${(o.price || 0).toLocaleString('vi-VN')}đ cho đơn #${req.params.id}`,
    time: new Date().toLocaleTimeString('vi-VN') + ' hôm nay'
  });

  writeData(data);
  res.json({ success: true, order: o, message: 'Xác nhận thanh toán MBBank thành công!' });
});

// 4. Categories & SEO API
app.get('/api/categories', (req, res) => {
  const data = readData();
  res.json({ success: true, categories: data.categories || [] });
});

app.put('/api/categories/:id/seo', (req, res) => {
  const data = readData();
  const cat = (data.categories || []).find(c => c.id === req.params.id);
  if (!cat) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
  }

  cat.seo = { ...(cat.seo || {}), ...req.body };
  writeData(data);
  res.json({ success: true, category: cat, message: 'Đã cập nhật cấu hình SEO danh mục thành công!' });
});

// 5. Customers (CRM) API
app.get('/api/customers', (req, res) => {
  const data = readData();
  const { type, search } = req.query;
  let list = data.customers || [];

  if (type && type !== 'all') {
    list = list.filter(c => c.type === type);
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.phone && c.phone.includes(q)) || 
      (c.email && c.email.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: list.length, customers: list });
});

// 6. Shop Partners API
app.get('/api/partners', (req, res) => {
  const data = readData();
  res.json({ success: true, count: (data.partners || []).length, partners: data.partners || [] });
});

app.post('/api/partners/auto-assign', (req, res) => {
  const data = readData();
  const { district } = req.body;
  const partners = data.partners || [];
  
  // Find partner covering this district
  let matched = partners.find(p => p.districts && p.districts.includes(district));
  if (!matched) matched = partners[0];

  res.json({
    success: true,
    matchedPartner: matched,
    message: `Đã tìm thấy shop hoa phù hợp nhất cho khu vực ${district}: [${matched.name}]`
  });
});

// 7. Delivery & Logistics API
app.get('/api/delivery', (req, res) => {
  const data = readData();
  res.json({
    success: true,
    shippers: data.deliveryShippers || [],
    routes: [
      { id: 'route-1', name: 'Tuyến Q.3 - Phú Nhuận', count: 3, status: 'Đang giao' },
      { id: 'route-2', name: 'Tuyến Gò Vấp - Q.12', count: 2, status: 'Đang giao' },
      { id: 'route-3', name: 'Tuyến Bình Tân (Bình Hưng Hòa)', count: 4, status: 'Đang giao' }
    ]
  });
});

// 8. QC & POD Gallery API
app.get('/api/qc', (req, res) => {
  const data = readData();
  res.json({ success: true, queue: data.qcQueue || [] });
});

app.put('/api/qc/:id/review', (req, res) => {
  const data = readData();
  const { approved, issues, notes } = req.body;
  const item = (data.qcQueue || []).find(q => q.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy mục QC' });
  }

  if (approved) {
    item.status = 'Đã duyệt cho đi giao';
    item.issues = [];
  } else {
    item.status = 'Yêu cầu chỉnh sửa';
    item.issues = issues || ['Cần chỉnh sửa'];
    item.rejectNotes = notes || '';
  }

  // Also sync order status
  const order = (data.orders || []).find(o => o.id === item.orderId);
  if (order) {
    if (approved) {
      order.qcStatus = 'Đã duyệt';
      order.status = 'Đang giao';
    } else {
      order.qcStatus = 'Cần chỉnh sửa';
      order.status = 'Đang cắm hoa';
    }
  }

  data.auditLogs.unshift({
    id: 'log-' + Date.now(),
    user: 'Trần Thùy Linh (QC)',
    action: approved ? 'Duyệt ảnh QC' : 'Từ chối ảnh QC',
    details: approved 
      ? `Đã duyệt ảnh đơn #${item.orderId} (Đạt chuẩn 100%)` 
      : `Yêu cầu shop sửa đơn #${item.orderId}: ${(issues || []).join(', ')}`,
    time: new Date().toLocaleTimeString('vi-VN') + ' hôm nay'
  });

  writeData(data);
  res.json({ success: true, item, message: approved ? 'Đã duyệt đạt chuẩn QC!' : 'Đã gửi yêu cầu chỉnh sửa cho shop đối tác!' });
});

// 9. Finance & Payouts API
app.get('/api/payouts', (req, res) => {
  const data = readData();
  res.json({ success: true, payouts: data.payouts || [] });
});

// 10. Promotions API
app.get('/api/promotions', (req, res) => {
  const data = readData();
  res.json({ success: true, promotions: data.promotions || {} });
});

app.post('/api/promotions/voucher', (req, res) => {
  const data = readData();
  const newVoucher = {
    code: req.body.code.toUpperCase(),
    discount: req.body.discount,
    maxDiscount: req.body.maxDiscount,
    minOrder: req.body.minOrder,
    used: 0,
    limit: parseInt(req.body.limit, 10) || 100,
    expiry: req.body.expiry || '31/12/2026',
    status: 'Đang áp dụng'
  };

  if (!data.promotions.vouchers) data.promotions.vouchers = [];
  data.promotions.vouchers.unshift(newVoucher);
  writeData(data);
  res.status(201).json({ success: true, voucher: newVoucher });
});

// 11. Reports & Analytics API
app.get('/api/reports', (req, res) => {
  const data = readData();
  res.json({ success: true, reports: data.reports || {} });
});

// 12. Condolence Library API
app.get('/api/condolence-library', (req, res) => {
  const data = readData();
  res.json({ success: true, library: data.condolenceLibrary || [] });
});

// 13. Users & Audit Logs API
app.get('/api/users', (req, res) => {
  const data = readData();
  res.json({ success: true, users: data.users || [] });
});

app.get('/api/audit-logs', (req, res) => {
  const data = readData();
  res.json({ success: true, logs: data.auditLogs || [] });
});

// 14. Settings API
app.get('/api/settings', (req, res) => {
  const data = readData();
  res.json({ success: true, settings: data.settings || {} });
});

app.put('/api/settings', (req, res) => {
  const data = readData();
  data.settings = { ...(data.settings || {}), ...req.body };
  writeData(data);
  res.json({ success: true, settings: data.settings, message: 'Đã lưu cấu hình hệ thống thành công!' });
});

// 15. SEO Articles (Blog) API
app.get('/api/articles', (req, res) => {
  const data = readData();
  const articles = data.articles || [];
  articles.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  res.json({ success: true, count: articles.length, articles });
});

app.post('/api/articles', (req, res) => {
  const data = readData();
  const now = new Date();
  const dateFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

  const slug = (req.body.title || 'bai-viet-moi')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newArticle = {
    id: 'art-' + Date.now(),
    title: req.body.title || 'Bài viết kiến thức tang lễ mới',
    category: req.body.category || 'Cẩm nang phúng viếng',
    author: req.body.author || 'Ban Biên Tập Hoa Viếng',
    publishedAt: dateFormatted,
    createdAt: now.toISOString(),
    excerpt: req.body.excerpt || 'Chia sẻ cẩm nang tang lễ chuẩn mực...',
    content: req.body.content || 'Nội dung chi tiết...',
    readTime: req.body.readTime || '4 phút đọc',
    views: 120,
    slug
  };

  data.articles.unshift(newArticle);
  writeData(data);
  res.status(201).json({ success: true, article: newArticle });
});

app.delete('/api/articles/:id', (req, res) => {
  const data = readData();
  const index = data.articles.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
  }

  const deleted = data.articles.splice(index, 1);
  writeData(data);
  res.json({ success: true, article: deleted[0] });
});

// 16. Reviews & Activities
app.get('/api/activities', (req, res) => {
  const data = readData();
  res.json({ success: true, activities: data.activities || [] });
});

// 16. Reviews & Customer Feedback API (Public & Admin)
app.get('/api/reviews', (req, res) => {
  const data = readData();
  const allReviews = data.reviews || [];

  // If req.query.all === 'true' (called from Admin): return all reviews (pending, approved, rejected)
  if (req.query.all === 'true') {
    const pendingCount = allReviews.filter(r => r.status === 'pending').length;
    res.json({
      success: true,
      count: allReviews.length,
      pendingCount,
      reviews: allReviews
    });
  } else {
    // Public frontend: ONLY return approved reviews!
    const approvedReviews = allReviews.filter(r => r.status === 'approved' || (!r.status && r.verified !== false));
    res.json({
      success: true,
      count: approvedReviews.length,
      reviews: approvedReviews
    });
  }
});

// POST a new review from Frontend (Status defaults to 'pending' - Chờ kiểm duyệt)
app.post('/api/reviews', (req, res) => {
  const data = readData();
  if (!data.reviews) data.reviews = [];

  const rating = parseInt(req.body.rating, 10) || 5;
  const newReview = {
    id: 'rev-' + Date.now(),
    customer: req.body.customer || 'Khách hàng',
    role: req.body.role || 'Khách hàng thân thiết',
    rating: Math.max(1, Math.min(5, rating)),
    comment: req.body.comment || '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    date: 'Vừa xong',
    createdAt: new Date().toISOString(),
    verified: false,
    status: 'pending', // Phải chờ quản trị viên phê duyệt trong admin!
    likes: 0
  };

  data.reviews.unshift(newReview);

  // Ghi nhật ký hoạt động
  if (!data.activities) data.activities = [];
  data.activities.unshift({
    id: 'act-' + Date.now(),
    text: `Khách hàng ${newReview.customer} gửi đánh giá ${newReview.rating}⭐ (Đang chờ Quản trị viên duyệt)`,
    time: 'Vừa xong',
    type: 'review'
  });

  writeData(data);
  res.status(201).json({
    success: true,
    message: 'Đánh giá của bạn đã được ghi nhận và đang chờ Quản trị viên phê duyệt trước khi hiển thị trên website.',
    review: newReview
  });
});

// PUT /api/reviews/:id/status (Quản trị viên Duyệt hoặc Từ chối đánh giá)
app.put('/api/reviews/:id/status', (req, res) => {
  const data = readData();
  const review = (data.reviews || []).find(r => r.id === req.params.id);
  if (!review) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đánh giá cần xử lý' });
  }

  const newStatus = req.body.status; // 'approved' or 'rejected'
  if (!['approved', 'rejected', 'pending'].includes(newStatus)) {
    return res.status(400).json({ success: false, message: 'Trạng thái phê duyệt không hợp lệ' });
  }

  review.status = newStatus;
  if (newStatus === 'approved') {
    review.verified = true;
  }

  // Ghi Audit log
  if (!data.auditLogs) data.auditLogs = [];
  data.auditLogs.unshift({
    id: 'log-' + Date.now(),
    user: 'Admin Quản trị viên',
    action: newStatus === 'approved' ? 'Phê duyệt hiển thị đánh giá' : 'Từ chối / Ẩn đánh giá',
    target: `Đánh giá của ${review.customer} (${review.rating} sao)`,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
    status: 'success'
  });

  writeData(data);
  res.json({
    success: true,
    message: newStatus === 'approved' 
      ? 'Đã phê duyệt đánh giá! Cảm nhận của khách hàng đã hiển thị ra ngoài trang chủ.' 
      : 'Đã từ chối/ẩn đánh giá khỏi trang chủ.',
    review
  });
});

// DELETE /api/reviews/:id (Xóa đánh giá)
app.delete('/api/reviews/:id', (req, res) => {
  const data = readData();
  const index = (data.reviews || []).findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đánh giá cần xóa' });
  }

  const deleted = data.reviews.splice(index, 1);
  writeData(data);
  res.json({ success: true, message: 'Đã xóa đánh giá thành công', review: deleted[0] });
});

// HTML Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Category Pages (Vòng Hoa, Kệ Hoa, Giỏ Hoa, Lan Hồ Điệp)
app.get(['/vong-hoa', '/ke-hoa', '/gio-hoa', '/lan-ho-diep', '/danh-muc/:category'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'danh-muc.html'));
});

// Promotion Page (Ưu Đãi & Chính Sách)
app.get(['/uu-dai', '/khuyen-mai'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'uu-dai.html'));
});

// News & SEO Articles Page (Tin Tức)
app.get(['/tin-tuc', '/bai-viet'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tin-tuc.html'));
});

// Contact & Store Locations Page (Liên Hệ & Hệ thống cửa hàng)
app.get(['/lien-he', '/cua-hang'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lien-he.html'));
});

app.get('/chinh-sach', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chinh-sach.html'));
});

app.get('/chinh-sach-quy-dinh', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chinh-sach.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Listen on PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`🌸 HOA VIẾNG - HỆ THỐNG VẬN HÀNH & QUẢN TRỊ 5 PHÂN HỆ`);
  console.log(`🚀 Server đang chạy tại cổng: ${PORT}`);
  console.log(`🛒 Giao diện Khách hàng (Front-end): http://localhost:${PORT}/`);
  console.log(`⚙️  Giao diện Quản trị (Back-end/Admin): http://localhost:${PORT}/admin`);
  console.log('====================================================');
});
