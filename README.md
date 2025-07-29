# NEOMEDYA E-TİCARET PLATFORMLARI

Modern e-ticaret platformları projesi - TECH ve EV platformları ile tam özellikli admin paneli.

## 🚀 Özellikler

### 🌐 Platformlar
- **NEOMEDYA TECH**: Teknoloji ve elektronik ürünleri
- **NEOMEDYA EV**: Ev dekorasyon ve mobilya ürünleri

### 💳 Ödeme Sistemleri
- Kredi Kartı (Visa, MasterCard, American Express)
- Havale/EFT
- Kapıda Ödeme
- PayTR (Yakında)

### 🔧 Admin Paneli
- Tam özellikli yönetim paneli
- Ürün yönetimi (CRUD)
- Sipariş takibi
- Kullanıcı yönetimi
- Site ayarları
- Analitik dashboard

### 🛍️ E-ticaret Özellikleri
- Gelişmiş arama ve filtreleme
- Sepet yönetimi
- Favori ürünler
- Sipariş takibi
- Responsive tasarım

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/your-username/neomedya-ecommerce.git
cd neomedya-ecommerce
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:3003
```

## 🚀 Canlıya Deploy Etme

### Vercel ile Deploy

1. **Vercel CLI kurun**
```bash
npm i -g vercel
```

2. **Giriş yapın**
```bash
vercel login
```

3. **Deploy edin**
```bash
npm run deploy
```

### Manuel Deploy

1. **Build alın**
```bash
npm run build
```

2. **Vercel Dashboard'da deploy edin**
   - [vercel.com](https://vercel.com) adresine gidin
   - GitHub reponuzu bağlayın
   - Otomatik deploy aktif olacak

## 🔐 Admin Paneli

### Giriş Bilgileri
- **URL**: `/admin`
- **Kullanıcı**: `admin`
- **Şifre**: `admin123`

### Özellikler
- Dashboard istatistikleri
- Ürün yönetimi
- Sipariş takibi
- Kullanıcı yönetimi
- Site ayarları

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── admin/          # Admin paneli
│   ├── tech/           # TECH platformu
│   ├── ev/             # EV platformu
│   ├── globals.css     # Global stiller
│   └── layout.tsx      # Ana layout
├── components/          # Yeniden kullanılabilir bileşenler
└── ...
```

## 🎨 Teknolojiler

- **Framework**: Next.js 14
- **Dil**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deploy**: Vercel

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Lint kontrolü
npm run lint

# Deploy
npm run deploy
```

## 📱 Platformlar

### NEOMEDYA TECH
- **URL**: `/tech`
- **Kategoriler**: Telefonlar, Bilgisayarlar, Aksesuarlar, Kamera
- **Tema**: Mavi/Yeşil

### NEOMEDYA EV
- **URL**: `/ev`
- **Kategoriler**: Oturma Odası, Aydınlatma, Mutfak, Banyo
- **Tema**: Turuncu/Kırmızı

## 🔒 Güvenlik

- SSL şifreleme
- Güvenli ödeme işlemleri
- Admin paneli koruması
- Form validasyonu

## 📞 Destek

- **Email**: info@neomedya.com
- **Website**: https://neomedya.com
- **GitHub**: https://github.com/neomedya

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**NEOMEDYA** - Modern E-ticaret Çözümleri 