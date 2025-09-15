import { Header, Footer } from '@/components/layout';
import { WhatsAppFloat } from '@/components/ui';
import { 
  HeroSection, 
  ServicesSection, 
  TestimonialsSection,
  AboutSection,
  PortfolioSection,
  ContactSection,
  FAQSection 
} from '@/components/sections';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Skip links para acessibilidade */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <a href="#services" className="skip-link">
        Pular para serviços
      </a>
      <a href="#contact" className="skip-link">
        Pular para contato
      </a>
      
      <Header />
      <main id="main-content">
        <HeroSection />
        <section id="services">
          <ServicesSection />
        </section>
        <AboutSection />
        <PortfolioSection />
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <FAQSection />
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
