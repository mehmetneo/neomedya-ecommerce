import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              Neomedya
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              En kaliteli moda ürünlerini uygun fiyatlarla sunuyoruz. 
              Erkek, kadın ve çocuk kıyafetleri, ayakkabılar ve aksesuarlar.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/erkek" className="text-gray-400 hover:text-white transition-colors">
                  Erkek Kıyafetleri
                </Link>
              </li>
              <li>
                <Link href="/kadin" className="text-gray-400 hover:text-white transition-colors">
                  Kadın Kıyafetleri
                </Link>
              </li>
              <li>
                <Link href="/cocuk" className="text-gray-400 hover:text-white transition-colors">
                  Çocuk Kıyafetleri
                </Link>
              </li>
              <li>
                <Link href="/ayakkabi" className="text-gray-400 hover:text-white transition-colors">
                  Ayakkabılar
                </Link>
              </li>
              <li>
                <Link href="/aksesuar" className="text-gray-400 hover:text-white transition-colors">
                  Aksesuarlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/giris" className="text-gray-400 hover:text-white transition-colors">
                  Giriş Yap
                </Link>
              </li>
              <li>
                <Link href="/kayit" className="text-gray-400 hover:text-white transition-colors">
                  Kayıt Ol
                </Link>
              </li>
              <li>
                <Link href="/siparislerim" className="text-gray-400 hover:text-white transition-colors">
                  Siparişlerim
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  İade ve Değişim
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Yardım Merkezi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Neomedya. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kullanım Şartları
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                KVKK
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 