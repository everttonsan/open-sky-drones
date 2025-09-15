'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Container, Card, LoadingSpinner } from '../ui';
import { useTestimonials } from '@/hooks/useTestimonials';

// Dados estáticos como fallback
const staticTestimonials = [
  {
    id: '1',
    name: 'Carlos Silva',
    role: 'Diretor de Marketing',
    company: 'Imobiliária Premium',
    rating: 5,
    testimonial: 'O trabalho da Open Sky Drones superou nossas expectativas. As fotos aéreas dos nossos empreendimentos ficaram espetaculares e aumentaram significativamente o interesse dos clientes.',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Engenheira Civil',
    company: 'Construtora Horizonte',
    rating: 5,
    testimonial: 'Excelente serviço de mapeamento! A precisão dos dados coletados nos ajudou muito no planejamento da obra. Profissionalismo impecável e entrega no prazo.',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'João Oliveira',
    role: 'Produtor de Eventos',
    company: 'EventoMax',
    rating: 5,
    testimonial: 'Contratamos para cobertura aérea do nosso festival. O resultado foi incrível! Capturaram momentos únicos que só são possíveis com drone. Recomendo 100%!',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Ana Costa',
    role: 'Gerente de Facilities',
    company: 'Indústria Solar Tech',
    rating: 5,
    testimonial: 'As inspeções de painéis solares ficaram muito mais eficientes e seguras. Relatórios detalhados e análise térmica de alta qualidade. Parceria que faz a diferença!',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Ricardo Ferreira',
    role: 'Fazendeiro',
    company: 'Fazenda Santa Clara',
    rating: 5,
    testimonial: 'O monitoramento da propriedade rural ficou revolucionário. Conseguimos detectar problemas nas culturas muito antes e otimizar o uso de recursos. Tecnologia incrível!',
    created_at: new Date().toISOString()
  },
];

export const TestimonialsSection: React.FC = () => {
  const { testimonials: adminTestimonials, isLoading } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Usar dados do admin se disponíveis, senão usar dados estáticos
  const testimonials = adminTestimonials.length > 0 ? adminTestimonials : staticTestimonials;

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, testimonials.length]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <Container>
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        </Container>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];
  
  // Se não há depoimentos ou currentTestimonial é undefined, não renderizar
  if (!testimonials.length || !currentTestimonial) {
    return (
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <Container>
          <div className="text-center py-20">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-tech-black dark:text-white mb-6">
              O que nossos{' '}
              <span className="bg-gradient-sky bg-clip-text text-transparent">
                clientes dizem
              </span>
            </h2>
            <p className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400">
              Depoimentos serão exibidos aqui em breve.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="font-heading font-bold text-3xl md:text-4xl text-tech-black dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            O que nossos{' '}
            <span className="bg-gradient-sky bg-clip-text text-transparent">
              clientes dizem
            </span>
          </motion.h2>
          
          <motion.p
            className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Depoimentos reais de clientes satisfeitos que confiaram 
            em nossos serviços de drone.
          </motion.p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="text-center p-8 md:p-12 relative">
                <Quote className="absolute top-6 left-6 text-primary/20" size={40} />
                
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={24} />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="font-body text-lg md:text-xl text-tech-black dark:text-white leading-relaxed mb-8">
                  "{currentTestimonial.testimonial}"
                </blockquote>
                
                {/* Client Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-sky flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-xl">
                      {('name' in currentTestimonial ? currentTestimonial.name : currentTestimonial.client_name)?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-heading font-semibold text-lg text-tech-black dark:text-white">
                      {'name' in currentTestimonial ? currentTestimonial.name : currentTestimonial.client_name}
                    </div>
                    <div className="font-body text-drone-gray-500 dark:text-drone-gray-400">
                      {'role' in currentTestimonial ? currentTestimonial.role : ''}
                    </div>
                    <div className="font-body text-primary font-medium">
                      {'company' in currentTestimonial ? currentTestimonial.company : ''}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 shadow-elevation rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              prevTestimonial();
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-700 shadow-elevation rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => {
              setIsAutoPlaying(false);
              nextTestimonial();
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary' : 'bg-drone-gray/30'
              }`}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: '4.9/5', label: 'Avaliação Média' },
            { number: '100%', label: 'Clientes Satisfeitos' },
            { number: '50+', label: 'Avaliações Positivas' },
            { number: '24h', label: 'Resposta Máxima' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-heading font-bold text-2xl text-primary mb-1">
                {stat.number}
              </div>
              <div className="font-body text-sm text-drone-gray-500 dark:text-drone-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};