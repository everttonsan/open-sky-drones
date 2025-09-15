import type { Metadata } from "next";
import { Exo_2, Montserrat } from "next/font/google";
import { ErrorBoundary } from "@/components/ui";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GoogleAnalytics, MetaPixel } from "@/components/tracking/Analytics";
import { PreloadImages } from "@/components/ui/PreloadImages";
import "./globals.css";

// Exo 2 Bold para títulos conforme especificação
const exo2 = Exo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  fallback: ['system-ui', 'arial'],
});

// Montserrat Regular para textos corridos conforme especificação
const montserrat = Montserrat({
  variable: "--font-body", 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: "Open Sky Drones - Capturando sua visão do céu",
    template: "%s | Open Sky Drones"
  },
  description: "Serviços profissionais de drone para captura aérea, mapeamento, inspeções e muito mais. Open Sky Drones - sua perspectiva do céu.",
  keywords: ["drone", "fotografia aérea", "mapeamento", "inspeção", "video aéreo", "open sky drones", "são paulo", "brasil"],
  authors: [{ name: "Open Sky Drones" }],
  creator: "Open Sky Drones",
  publisher: "Open Sky Drones",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.opensydrones.com.br'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  openGraph: {
    title: "Open Sky Drones - Capturando sua visão do céu",
    description: "Serviços profissionais de drone para captura aérea, mapeamento, inspeções e muito mais. Open Sky Drones - sua perspectiva do céu.",
    url: 'https://www.opensydrones.com.br',
    siteName: 'Open Sky Drones',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Sky Drones - Serviços Profissionais de Drone',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Open Sky Drones - Capturando sua visão do céu",
    description: "Serviços profissionais de drone para captura aérea, mapeamento, inspeções e muito mais.",
    images: ['/images/og-image.jpg'],
    creator: '@opensydrones',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
    yandex: 'your-yandex-verification-code', // Add your actual verification code if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
      </head>
      <body
        className={`${exo2.variable} ${montserrat.variable} font-body antialiased bg-background text-foreground`}
      >
        <PreloadImages />
        <ThemeProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
