const fs = require('fs');
const path = require('path');

// Özelleştirme konfigürasyonu
const config = {
  siteName: process.argv[2] || 'Yeni Mağaza',
  domain: process.argv[3] || 'yeni-magaza.com',
  adminEmail: process.argv[4] || 'admin@yeni-magaza.com',
  adminPassword: process.argv[5] || 'admin123!',
  primaryColor: process.argv[6] || '#3B82F6',
  secondaryColor: process.argv[7] || '#8B5CF6'
};

console.log('🎨 Site özelleştiriliyor...');
console.log('📋 Konfigürasyon:', config);

// Dosyaları güncelle
const filesToUpdate = [
  {
    path: 'app/layout.tsx',
    replacements: [
      { from: 'Neomedya E-ticaret', to: config.siteName },
      { from: 'neomedya.com', to: config.domain }
    ]
  },
  {
    path: 'app/admin/login/page.tsx',
    replacements: [
      { from: 'admin', to: config.adminEmail },
      { from: 'neomedya2024!', to: config.adminPassword }
    ]
  },
  {
    path: 'app/api/admin/auth/route.ts',
    replacements: [
      { from: 'admin', to: config.adminEmail },
      { from: 'neomedya2024!', to: config.adminPassword }
    ]
  },
  {
    path: 'app/page.tsx',
    replacements: [
      { from: 'Neomedya', to: config.siteName }
    ]
  },
  {
    path: 'app/globals.css',
    replacements: [
      { from: '#3B82F6', to: config.primaryColor },
      { from: '#8B5CF6', to: config.secondaryColor }
    ]
  }
];

// Dosyaları güncelle
filesToUpdate.forEach(file => {
  try {
    const filePath = path.join(process.cwd(), file.path);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      file.replacements.forEach(replacement => {
        content = content.replace(new RegExp(replacement.from, 'g'), replacement.to);
      });
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${file.path} güncellendi`);
    }
  } catch (error) {
    console.error(`❌ ${file.path} güncellenirken hata:`, error.message);
  }
});

// Yeni package.json oluştur
const packageJson = {
  name: config.siteName.toLowerCase().replace(/\s+/g, '-'),
  version: "1.0.0",
  description: `${config.siteName} - Modern e-commerce platform`,
  scripts: {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  dependencies: {
    "next": "14.2.30",
    "react": "^18",
    "react-dom": "^18",
    "nodemailer": "^6.9.7",
    "@types/nodemailer": "^6.4.14"
  },
  devDependencies: {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.2.30"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ package.json güncellendi');

// README oluştur
const readme = `# ${config.siteName}

Modern e-commerce platform built with Next.js.

## Özellikler

- 🛒 Tam e-ticaret sistemi
- 👤 Kullanıcı yönetimi
- 📦 Sipariş takibi
- 💳 Ödeme entegrasyonu
- 📧 E-posta bildirimleri
- 🎨 Admin paneli

## Kurulum

\`\`\`bash
npm install
npm run dev
\`\`\`

## Admin Giriş

- URL: /admin
- E-posta: ${config.adminEmail}
- Şifre: ${config.adminPassword}

## Domain

${config.domain}
`;

fs.writeFileSync('README.md', readme);
console.log('✅ README.md oluşturuldu');

console.log('\n🎉 Özelleştirme tamamlandı!');
console.log('\n📋 Sonraki adımlar:');
console.log('1. npm install');
console.log('2. npm run dev');
console.log('3. Vercel\'e deploy et');
console.log('4. Domain\'i bağla'); 