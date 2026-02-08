# YB Digital Web

YB Digital için premium, animasyonlu ve modern web sitesi.

## 🚀 Teknolojiler

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (Animasyonlar)
- **Lucide React** (İkonlar)

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install
# veya
pnpm install

# Geliştirme sunucusunu başlat
npm run dev
# veya
pnpm dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
/app
  /biz-kimiz          # Biz Kimiz sayfası
  /nasil-yapiyoruz    # Nasıl Yapıyoruz sayfası
  /neler-yapiyoruz    # Neler Yapıyoruz sayfası
  /markalar           # Markalar sayfası
  /iletisim           # İletişim sayfası
  layout.tsx          # Root layout
  page.tsx            # Ana sayfa
  globals.css         # Global stiller

/components
  Navbar.tsx          # Navigasyon çubuğu
  Footer.tsx          # Footer
  Hero.tsx            # Ana sayfa hero bölümü
  Card.tsx            # Genel kart bileşeni
  Section.tsx         # Bölüm wrapper
  MarqueeLogos.tsx    # Logo slider
  Timeline.tsx        # Süreç timeline
  TeamCard.tsx        # Takım üyesi kartı
  ContactForm.tsx     # İletişim formu

/lib
  siteData.ts         # Tüm içerik verileri

/public
  /images             # Görseller (burak-gokce.jpg, tolga-biyik.jpg)
  /logos              # Logo dosyaları
```

## 🎨 Tasarım Özellikleri

- **Renk Paleti**: Koyu lacivert arka plan (#070B1A), mavi-cyan gradient vurgular
- **Glassmorphism**: Şeffaf kartlar ve blur efektleri
- **Animasyonlar**: Framer Motion ile smooth scroll reveal ve hover efektleri
- **Responsive**: Mobile-first yaklaşım

## 📝 İçerik Güncellemeleri

Tüm içerik verileri `lib/siteData.ts` dosyasında toplanmıştır. Metinleri, linkleri ve verileri buradan güncelleyebilirsiniz.

## 🖼️ Görseller

Aşağıdaki görselleri `public/images/` klasörüne ekleyin:
- `burak-gokce.jpg` - Burak Gökçe fotoğrafı
- `tolga-biyik.jpg` - Tolga Bıyık fotoğrafı

Logo dosyalarını `public/logos/` klasörüne ekleyin:
- `kolayayat.svg`
- `entreworld.svg`
- `novently.svg`

## 🔗 Sosyal Medya Linkleri

Sosyal medya linklerini `lib/siteData.ts` dosyasındaki `socialLinks` objesinden güncelleyin.

## 🚢 Deployment

Vercel'e deploy etmek için:

```bash
npm run build
```

Vercel otomatik olarak Next.js projelerini algılar ve deploy eder.

## 📄 Lisans

Bu proje YB Digital için özel olarak geliştirilmiştir.
