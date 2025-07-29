const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Yeni E-ticaret Sitesi Oluşturucu');
console.log('=====================================\n');

// Kullanıcıdan bilgi al
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createNewSite() {
  try {
    console.log('📋 Müşteri bilgilerini girin:\n');
    
    const siteName = await question('🏪 Site adı: ');
    const domain = await question('🌐 Domain adresi: ');
    const adminEmail = await question('📧 Admin e-posta: ');
    const adminPassword = await question('🔐 Admin şifre: ');
    const primaryColor = await question('🎨 Ana renk (hex): ') || '#3B82F6';
    const secondaryColor = await question('🎨 İkincil renk (hex): ') || '#8B5CF6';
    
    console.log('\n🎨 Site özelleştiriliyor...');
    
    // Özelleştirme script'ini çalıştır
    execSync(`node scripts/customize.js "${siteName}" "${domain}" "${adminEmail}" "${adminPassword}" "${primaryColor}" "${secondaryColor}"`, { stdio: 'inherit' });
    
    console.log('\n📦 Bağımlılıklar yükleniyor...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('\n✅ Site hazır!');
    console.log('\n📋 Sonraki adımlar:');
    console.log('1. npm run dev (geliştirme için)');
    console.log('2. node scripts/deploy.js (production için)');
    console.log('3. Vercel\'e giriş yapın');
    console.log('4. Domain\'i bağlayın');
    
    console.log('\n🔧 Admin bilgileri:');
    console.log(`URL: /admin`);
    console.log(`E-posta: ${adminEmail}`);
    console.log(`Şifre: ${adminPassword}`);
    
    rl.close();
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
    rl.close();
  }
}

createNewSite(); 