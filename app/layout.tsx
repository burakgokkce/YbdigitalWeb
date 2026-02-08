import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'YB Digital — Sen Düşün, Biz Yapalım',
  description: 'YB Digital olarak dijital dünyada fark yaratan projeler geliştiriyor ve şirketlere yenilikçi çözümler sunuyoruz. 15 kişilik profesyonel ve genç dinamik ekibimizle yanınızdayız.',
  icons: {
    icon: '/images/yb-digital-logo.png',
    apple: '/images/yb-digital-logo.png',
  },
  openGraph: {
    title: 'YB Digital — Sen Düşün, Biz Yapalım',
    description: 'YB Digital olarak dijital dünyada fark yaratan projeler geliştiriyor ve şirketlere yenilikçi çözümler sunuyoruz. 15 kişilik profesyonel ve genç dinamik ekibimizle yanınızdayız.',
    type: 'website',
    images: ['/images/yb-digital-logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
