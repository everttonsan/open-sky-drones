import { useRouter } from 'next/router';
import { SEOHead } from '@/components/seo/SEOHead';

interface UseSEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

export const useSEO = (props: UseSEOProps) => {
  const router = useRouter();
  const canonical = `https://www.opensydrones.com.br${router.asPath}`;

  return {
    SEOComponent: () => (
      <SEOHead
        {...props}
        canonical={canonical}
      />
    ),
    canonical,
  };
};

// Pre-defined SEO configurations for common pages
export const seoConfigs = {
  home: {
    title: 'Open Sky Drones - Capturando sua visão do céu',
    description: 'Serviços profissionais de drone para captura aérea, mapeamento, inspeções e muito mais. Open Sky Drones - sua perspectiva do céu.',
    keywords: 'drone, fotografia aérea, mapeamento, inspeção, video aéreo, open sky drones, são paulo',
  },
  services: {
    title: 'Nossos Serviços - Open Sky Drones',
    description: 'Conheça todos os nossos serviços profissionais de drone: fotografia aérea, vídeo cinematográfico, mapeamento, inspeções industriais e monitoramento.',
    keywords: 'serviços drone, fotografia aérea, vídeo drone, mapeamento topográfico, inspeção industrial',
  },
  portfolio: {
    title: 'Portfólio - Open Sky Drones',
    description: 'Veja nossos trabalhos mais recentes em fotografia e vídeo aéreo, mapeamento e inspeções. Qualidade profissional garantida.',
    keywords: 'portfólio drone, trabalhos anteriores, fotografia aérea, casos de sucesso',
  },
  testimonials: {
    title: 'Depoimentos de Clientes - Open Sky Drones',
    description: 'O que nossos clientes dizem sobre nossos serviços de drone. Avaliações reais de clientes satisfeitos.',
    keywords: 'depoimentos clientes, avaliações drone, feedback, testemunhos',
  },
  about: {
    title: 'Sobre Nós - Open Sky Drones',
    description: 'Conheça a Open Sky Drones, nossa história, missão e valores. Profissionais especializados em tecnologia de drones.',
    keywords: 'sobre open sky drones, história empresa, equipe profissional, missão valores',
  },
  contact: {
    title: 'Contato - Open Sky Drones',
    description: 'Entre em contato conosco para solicitar orçamento ou tirar dúvidas sobre nossos serviços de drone. Atendimento rápido e profissional.',
    keywords: 'contato, orçamento drone, fale conosco, whatsapp, telefone',
  },
};