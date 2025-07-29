const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Deployment konfigürasyonu
const config = {
  projectName: process.argv[2] || 'yeni-magaza',
  domain: process.argv[3] || 'yeni-magaza.com',
  vercelToken: process.env.VERCEL_TOKEN
};

console.log('🚀 Deployment başlatılıyor...');
console.log('📋 Konfigürasyon:', config);

// Vercel.json oluştur
const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('✅ vercel.json oluşturuldu');

// Deployment adımları
try {
  console.log('\n📦 Bağımlılıklar yükleniyor...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('\n🔨 Proje build ediliyor...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('\n🚀 Vercel\'e deploy ediliyor...');
  execSync('vercel --prod --yes', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment tamamlandı!');
  console.log(`🌐 Site: https://${config.domain}`);
  console.log(`🔧 Admin: https://${config.domain}/admin`);
  
} catch (error) {
  console.error('❌ Deployment hatası:', error.message);
  process.exit(1);
} 