'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export const GoogleAnalytics = ({ measurementId }: { measurementId?: string }) => {
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
};

export const MetaPixel = ({ pixelId }: { pixelId?: string }) => {
  useEffect(() => {
    if (!pixelId) return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // No-script fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.head.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(noscript);
    };
  }, [pixelId]);

  return null;
};

// Hook para tracking de eventos
export const useTracking = () => {
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }

    // Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
    }
  };

  const trackConversion = (value?: number, currency: string = 'BRL') => {
    trackEvent('Purchase', {
      value: value || 0,
      currency,
    });
  };

  const trackLead = () => {
    trackEvent('Lead');
  };

  const trackContact = () => {
    trackEvent('Contact');
  };

  return {
    trackEvent,
    trackConversion,
    trackLead,
    trackContact,
  };
};