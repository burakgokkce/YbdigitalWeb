
## Amaç
YB Digital için **çok premium**, “dijital ajans” hissini net veren, **animasyonlu + gölgeli + geçişli** (smooth), modern ve etkileyici bir web sitesi yapılacak.

Hedef his:
- Premium startup/agency
- Dijital, hızlı, güven veren
- Modern, minimal ama wow-effect’li
- Performanslı (animasyonlar var ama akıcı)

---

## Teknoloji & Kurulum Standardı
**Önerilen Stack**
- Next.js (App Router) + TypeScript
- TailwindCSS
- Framer Motion (animasyon)
- Lenis (smooth scroll) veya CSS scroll-behavior + motion
- next/image (performans)
- optional: GSAP (çok özel animasyonlar için) — önce Framer ile dene

**Proje Kurulumu**
- Node 18+
- `pnpm` tercih (olmazsa npm)
- Deploy: Vercel

---

## Tasarım Dili (Brand / UI)
### Renk Paleti (YB Digital hissi)
- Arka plan: koyu lacivert / midnight (#070B1A gibi)
- Ana vurgu: mavi-cyan gradient (ör. #00D4FF → #4F46E5)
- İkincil vurgu: soft mor / neon pembe çok az (sadece highlight)
- Metin: beyaz + gri tonlar
- Kartlar: glassmorphism + soft shadow

### Stil Kuralları
- Bol spacing, temiz grid
- Kartlarda: `backdrop-blur`, soft border, glow shadow
- Hover’larda: parallax / tilt / glow
- Butonlar: gradient border + shine efekti
- Bölümler arası geçiş: “blur-in”, “fade-up”, “slide” + scroll reveal
- Micro-interactions: ikon/ok animasyonları, link underline motion

### Tipografi
- Başlık: modern, güçlü (örn. Space Grotesk / Sora / Inter)
- Body: Inter
- Büyük başlıklar: 48–72px arası (responsive)

---

## Site Haritası (Sayfalar)
1) **Ana Sayfa** `/`
2) **Biz Kimiz** `/biz-kimiz`
3) **Nasıl Yapıyoruz** `/nasil-yapiyoruz`
4) **Neler Yapıyoruz** `/neler-yapiyoruz`
5) **Markalar / Referanslar** `/markalar`
6) **İletişim** `/iletisim`

> Not: Menüde hepsi görünsün. Ana sayfada özet bölümleri olsun; her biri kendi sayfasına linklesin.

---

## Global UI Bileşenleri
### Navbar
- Üstte sabit (sticky)
- Scroll olunca blur + küçülme (shrink)
- Menü: Ana Sayfa, Biz Kimiz, Nasıl Yapıyoruz, Neler Yapıyoruz, Markalar, İletişim
- Sağda ikonlar:
  - Instagram (YB Digital)
  - LinkedIn (YB Digital)
- CTA: “Teklif Al” (İletişim sayfasına scroll veya route)

### Footer
- Kısa tanım: “YB Digital — Dijitalde Gücünüz”
- Hızlı linkler
- Sosyal ikonlar
- Copyright

---

## Ana Sayfa İçerik Planı (WOW)
### 1) Hero (Full screen)
- Büyük başlık:
  - “YB Digital”
  - Alt: “Dijitalde Gücünüz”
- Kısa açıklama:
  - Web • Mobil • Otomasyon • UI/UX • Growth
- 2 CTA:
  - “Projeni Konuşalım” (İletişim)
  - “İşlerimizi Gör” (Markalar)
- Arka plan:
  - animated gradient mesh
  - hafif partikül / noise (abartmadan)
  - mouse-follow glow
- Animasyonlar:
  - başlık kelime kelime fade-up
  - butonlarda shine sweep
  - hafif 3D tilt (mouse move)

### 2) Hizmet Snapshot (4 kart)
Kartlar: Web, Mobil, Otomasyon (n8n), Tasarım
- Hover: glow + yükselme + ikon rotate
- Kısa açıklamalar

### 3) “Nasıl Yapıyoruz” Preview (3 adım)
- Keşif → Tasarım → Geliştirme/Deploy
- Scroll ile çizgi/flow animasyonu (timeline gibi)

### 4) “Neler Yapıyoruz” (Case-style)
- 6’lı grid kart
- Her kart: kategori + kısa metin + “Detay”
- Hover: image reveal / gradient border

### 5) “Çalıştığımız Markalar”
- Logo slider (infinite marquee)
- Yumuşak hız, hover’da durabilir
- Markalar (şimdilik placeholder):
  - Kolayayat
  - EntreWorld Teknoloji
  - Novently

### 6) CTA Band
- “Fikrini ürüne dönüştürelim.”
- Buton: “Teklif Al”

---

## Biz Kimiz Sayfası (`/biz-kimiz`)
### İçerik
- Başlık: “Biz Kimiz?”
- Kısa ajans hikayesi (premium, kısa)
- 2 kişi kartı:

**Kurucu: Burak Gökçe**
- Fotoğraf (assets’e koy)
- Rol: Founder
- 2–3 satır bio: “ürün odaklı, hız, kalite, global vizyon” gibi
- Sosyal linkler (isteğe bağlı)

**Tolga Bıyık**
- Rol: CEO
- Fotoğraf
- 2–3 satır bio

### Animasyon
- Foto kartları scroll ile reveal
- Hover’da tilt + shadow

> Not: İsim/rol metinleri net olsun. “Kurucu Burak Gökçe” ve “Tolga Bıyık CEO” mutlaka yazsın.

---

## Nasıl Yapıyoruz Sayfası (`/nasil-yapiyoruz`)
### Yapı
- Hero: “Planlı ilerleriz. Hızlı üretiriz. Kaliteyi koruruz.”
- Süreç 6 adım:
  1. Brief & hedef
  2. UX akış
  3. UI tasarım
  4. Geliştirme (web/mobil)
  5. Test & optimizasyon
  6. Yayın & bakım
- Her adım kartı: ikon + açıklama + mini metrik (örn. “1–3 gün”, “1 hafta” gibi opsiyonel)

### Özel Efekt
- Timeline çizgisi scroll ile dolsun
- Her adım görünür olunca “pop-in”

---

## Neler Yapıyoruz Sayfası (`/neler-yapiyoruz`)
### Kategoriler (Section)
1) Web Siteleri (Kurumsal / Landing / E-ticaret)
2) Mobil Uygulamalar (iOS / Android / Cross)
3) UI/UX Tasarım (Figma)
4) Otomasyon (n8n, entegrasyonlar)
5) İç Sistemler (panel, admin, dashboard)
6) Growth / Analytics (pixel, event, raporlama)

Her kategori:
- Sol: başlık + açıklama
- Sağ: 2–3 feature kartı
- Scroll reveal + subtle parallax

---

## Markalar Sayfası (`/markalar`)
### Amaç
Referans / portfolio hissi.

### Yapı
- Üstte kısa: “Güvenilir partnerlikler.”
- Logo grid + filtre (opsiyonel)
- 6–12 adet placeholder case kartı (şimdilik dummy):
  - Proje adı
  - Kategori etiketi
  - Kısa açıklama
  - “Detay” butonu (şimdilik modal/placeholder)

### Animasyon
- Kart hover: gradient border + shadow + hafif zoom
- Logo grid: yumuşak fade-in

---

## İletişim Sayfası (`/iletisim`)
### İçerik
- Başlık: “Projeni konuşalım.”
- Form:
  - Ad Soyad
  - E-posta
  - Telefon (opsiyonel)
  - Proje türü (select: Web/Mobil/Otomasyon/Tasarım)
  - Mesaj
  - Gönder butonu
- Sağ tarafta:
  - Instagram + LinkedIn ikonları
  - E-posta / telefon alanı (placeholder)
- Form submit: şimdilik UI-only veya basit API route

---

## Sosyal Linkler (Zorunlu)
Navbar ve Footer’da:
- Instagram: `https://instagram.com/<yb_digital_username>`
- LinkedIn: `https://linkedin.com/company/<yb_digital_company>`
> Şimdilik placeholder bırak, sonra gerçek link gir.

---

## Animasyon & Efekt Rehberi (Performanslı)
- Scroll reveal: Framer Motion `whileInView`
- Hero background: CSS gradient + blur layer + küçük noise texture
- Hover tilt: CSS transform + perspective (abartma)
- Shadow/glow: `drop-shadow` + `box-shadow` + gradient border
- Marquee: CSS animation (lightweight) veya Framer
- Avoid: aşırı heavy blur, devasa video background, gereksiz canvas

---

## Dosya / Klasör Yapısı

/app
/page.tsx (Home)
/biz-kimiz/page.tsx
/nasil-yapiyoruz/page.tsx
/neler-yapiyoruz/page.tsx
/markalar/page.tsx
/iletisim/page.tsx

/components
Navbar.tsx
Footer.tsx
Hero.tsx
Section.tsx
Card.tsx
MarqueeLogos.tsx
TeamCard.tsx
Timeline.tsx
ContactForm.tsx

/lib
siteData.ts (metinler, markalar, linkler)

/public
/images
burak-gokce.jpg
tolga-biyik.jpg
/logos
kolayayat.svg
entreworld.svg
novently.svg

---

## İçerik Datası (siteData.ts)
- `navLinks`
- `socialLinks`
- `services`
- `processSteps`
- `categories`
- `brands`
- `team`

Metinleri buradan yönet, sayfalarda map ile bas.

---

## Responsive Kuralları
- Mobile-first
- Hero: 1 sütun (butonlar alt alta)
- Desktop: 2 sütun (hero text + visual)
- Grid: 1/2/3/4 kırılımları
- Menü: mobile’da hamburger drawer

---

## SEO / Meta
- Her sayfada title + description
- OpenGraph (logo / banner)
- Hız hedefi: Lighthouse 90+ (animasyonlara rağmen)

---

## Cursor Görevi (Net İstek)
Cursor’a şunu yaptır:
1) Next.js + TS + Tailwind kurulumu
2) Yukarıdaki sayfaları oluştur
3) Navbar/Footer shared layout
4) Hero + reveal animasyonlar
5) Marquee logos
6) Biz Kimiz’te Burak & Tolga kartları (resim placeholder)
7) Contact form UI

---

## Kabul Kriterleri
- Çok premium görünüm
- Akıcı animasyonlar (kasmasın)
- Gölgeler/glow modern, abartısız
- Tüm sayfalar dolu ve tutarlı
- Sosyal ikonlar aktif
- “Kurucu Burak Gökçe” ve “Tolga Bıyık CEO” net görünsün

---

## Placeholder Metin Önerileri (Kısa)
- Ajans kısa tanım:
  “YB Digital, fikirleri hızlıca ürüne dönüştüren, tasarım ve mühendisliği birleştiren yeni nesil dijital stüdyodur.”
- Slogan:
  “Dijitalde Gücünüz”

