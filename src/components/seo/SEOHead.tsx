import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

const defaultMeta = {
  siteName: 'Open Sky Drones',
  baseUrl: 'https://www.opensydrones.com.br', // Update with your actual domain
  defaultImage: '/images/og-image.jpg',
  defaultKeywords: 'drone, fotografia aérea, mapeamento, inspeção, video aéreo, open sky drones',
  author: 'Open Sky Drones',
  twitterHandle: '@opensydrones',
};

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords = defaultMeta.defaultKeywords,
  canonical,
  ogImage = defaultMeta.defaultImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  publishedTime,
  modifiedTime,
  author = defaultMeta.author,
  noindex = false,
}) => {
  const fullTitle = title.includes(defaultMeta.siteName) 
    ? title 
    : `${title} | ${defaultMeta.siteName}`;
  
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : defaultMeta.baseUrl);
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${defaultMeta.baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="pt-br" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data for Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Open Sky Drones",
            "description": "Serviços profissionais de drone para captura aérea, mapeamento, inspeções e muito mais.",
            "url": defaultMeta.baseUrl,
            "telephone": "+55 11 99999-9999",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -23.5505,
              "longitude": -46.6333
            },
            "sameAs": [
              // Add your social media URLs here
              "https://instagram.com/opensydrones",
              "https://facebook.com/opensydrones",
              "https://linkedin.com/company/opensydrones"
            ],
            "serviceType": [
              "Fotografia Aérea",
              "Mapeamento com Drone",
              "Inspeções Industriais",
              "Monitoramento Aéreo"
            ]
          })
        }}
      />
    </Head>
  );
};