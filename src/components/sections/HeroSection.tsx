'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown, X } from 'lucide-react';
import { Container, Button } from '../ui';

export const HeroSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToNext = () => scrollToSection('#services');
  const scrollToContact = () => scrollToSection('#contact');
  const openVideoModal = () => setShowVideo(true);
  const closeVideoModal = () => setShowVideo(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com imagem/vídeo dinâmico de drone */}
      <div className="absolute inset-0">
        {/* Imagem de drone em ação com movimento sutil */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Overlay escuro melhorado para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/65" />
        
        {/* Gradiente adicional com cores da marca */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-black/20 to-transparent" />
        
        {/* Overlay adicional para garantir contraste WCAG AA */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Floating Shapes sutis para manter o visual tecnológico */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-12 h-12 bg-primary/20 rounded-full backdrop-blur-sm"
          animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          {/* Main Headline - melhorado para contraste */}
          <motion.h1
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Capturando sua{' '}
            <span 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              style={{
                textShadow: 'none'
              }}
            >
              visão do céu
            </span>
          </motion.h1>

          {/* Subtitle - melhorado para legibilidade */}
          <motion.p
            className="font-body text-lg md:text-xl text-white max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.4)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Serviços profissionais de drone para captura aérea, mapeamento, 
            inspeções e muito mais com tecnologia de ponta.
          </motion.p>

          {/* CTA Buttons - conforme especificação */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto shadow-xl"
            >
              Solicitar Orçamento
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={openVideoModal}
              className="w-full sm:w-auto group bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary shadow-xl"
            >
              <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              Assistir Vídeo de Apresentação
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: '500+', label: 'Projetos Concluídos' },
              { number: '50+', label: 'Clientes Satisfeitos' },
              { number: '5', label: 'Anos de Experiência' },
              { number: '100%', label: 'Satisfação' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div 
                  className="font-heading font-bold text-2xl md:text-3xl text-white mb-1"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  {stat.number}
                </div>
                <div 
                  className="font-body text-sm text-white"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white"
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown size={32} />
      </motion.button>

      {/* Modal de Vídeo de Apresentação */}
      {showVideo && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVideoModal}
        >
          <motion.div
            className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-2xl overflow-hidden"
            style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar - Maior para mobile */}
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={20} className="sm:hidden" />
              <X size={24} className="hidden sm:block" />
            </button>

            {/* Placeholder para vídeo - pode ser substituído por iframe do YouTube/Vimeo */}
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-sky-light/20 flex items-center justify-center">
              <div className="text-center text-white">
                <Play size={64} className="mx-auto mb-4 opacity-50" />
                <h3 className="font-heading text-2xl mb-2">Vídeo de Apresentação</h3>
                <p className="text-white/70 max-w-md">
                  Aqui seria exibido o vídeo de apresentação dos serviços da Open Sky Drones.
                  Substitua este placeholder pelo embed do seu vídeo.
                </p>
                <div className="mt-6 text-sm text-white/50">
                  {/* Exemplo de como integrar um vídeo real: */}
                  {/* <iframe src="https://www.youtube.com/embed/SEU_VIDEO_ID" /> */}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};