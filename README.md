# Neomedya E-ticaret

Modern ve şık giyim mağazası web sitesi. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

- **Responsive Tasarım** - Mobil ve desktop uyumlu
- **Kategori Sayfaları** - Erkek, Kadın, Çocuk, Ayakkabı, Aksesuar
- **Kullanıcı Sistemi** - Giriş, kayıt, profil yönetimi
- **Admin Panel** - Ürün, sipariş, müşteri yönetimi
- **Sepet Sistemi** - Alışveriş sepeti
- **Modern UI/UX** - Tailwind CSS ile güzel tasarım

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── erkek/page.tsx     # Erkek ürünleri
│   ├── kadin/page.tsx     # Kadın ürünleri
│   ├── cocuk/page.tsx     # Çocuk ürünleri
│   ├── ayakkabi/page.tsx  # Ayakkabı ürünleri
│   ├── aksesuar/page.tsx  # Aksesuar ürünleri
│   ├── giris/page.tsx     # Giriş sayfası
│   ├── kayit/page.tsx     # Kayıt sayfası
│   ├── profilim/page.tsx  # Profil sayfası
│   └── admin/page.tsx     # Admin paneli
├── components/            # React bileşenleri
│   ├── Header.tsx        # Navigasyon header
│   ├── Hero.tsx          # Ana sayfa hero
│   └── Cart.tsx          # Sepet bileşeni
├── data/                 # Veri dosyaları
│   └── products.ts       # Ürün verileri
└── store/               # State yönetimi
    └── cartStore.ts     # Sepet store
```

## 🛠️ Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - CSS framework
- **Zustand** - State yönetimi

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## 🌐 Canlı Site

Site şu adreste yayında: **https://mehmetneo.com.tr**

## 📞 İletişim

- **E-posta**: info@mehmetneo.com.tr
- **Telefon**: +90 555 123 45 67
- **Adres**: İstanbul, Türkiye

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 