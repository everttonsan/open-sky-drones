'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Map, Search, Video, Zap, Shield } from 'lucide-react';
import { Container, Card, LoadingSpinner } from '../ui';
import { useServices } from '@/hooks/useServices';

// Dados estáticos como fallback
const staticServices = [
  {
    icon: Camera,
    title: 'Fotografia Aérea',
    description: 'Captura de imagens aéreas profissionais para eventos, imóveis, marketing e documentação com qualidade cinematográfica.',
    features: ['Alta Resolução 4K+', 'Edição Profissional', 'Entrega Rápida']
  },
  {
    icon: Video,
    title: 'Vídeo Aéreo',
    description: 'Produção de vídeos aéreos cinematográficos para campanhas publicitárias, documentários e eventos especiais.',
    features: ['Gravação 4K/60fps', 'Estabilização Avançada', 'Pós-produção']
  },
  {
    icon: Map,
    title: 'Mapeamento',
    description: 'Mapeamento topográfico e ortofotografias de precisão para construção civil, agricultura e planejamento urbano.',
    features: ['Precisão Centimétrica', 'Modelos 3D', 'Análise de Dados']
  },
  {
    icon: Search,
    title: 'Inspeções',
    description: 'Inspeções técnicas seguras em torres, telhados, painéis solares e estruturas industriais de difícil acesso.',
    features: ['Relatórios Detalhados', 'Análise Térmica', 'Redução de Custos']
  },
  {
    icon: Zap,
    title: 'Monitoramento',
    description: 'Monitoramento de obras, propriedades rurais, eventos e áreas de segurança com tecnologia avançada.',
    features: ['Tempo Real', 'Alertas Automáticos', 'Histórico Completo']
  },
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Serviços especializados para segurança patrimonial, busca e salvamento com drones certificados.',
    features: ['Operação Noturna', 'Resposta Rápida', 'Equipe Certificada']
  }
];

// Mapear ícones baseado no nome do serviço no banco de dados
const getIconComponent = (iconName: string | undefined, title: string) => {
  if (iconName === 'camera' || title.toLowerCase().includes('fotografia')) return Camera;
  if (iconName === 'video' || title.toLowerCase().includes('vídeo')) return Video;
  if (iconName === 'map' || title.toLowerCase().includes('mapeamento')) return Map;
  if (iconName === 'search' || title.toLowerCase().includes('inspeç')) return Search;
  if (title.toLowerCase().includes('monitoramento')) return Zap;
  if (title.toLowerCase().includes('segurança')) return Shield;
  return Camera; // Ícone padrão
};

// Obter features baseado no tipo de serviço
const getServiceFeatures = (title: string) => {
  if (title.toLowerCase().includes('fotografia')) return ['Alta Resolução 4K+', 'Edição Profissional', 'Entrega Rápida'];
  if (title.toLowerCase().includes('vídeo')) return ['Gravação 4K/60fps', 'Estabilização Avançada', 'Pós-produção'];
  if (title.toLowerCase().includes('mapeamento')) return ['Precisão Centimétrica', 'Modelos 3D', 'Análise de Dados'];
  if (title.toLowerCase().includes('inspeç')) return ['Relatórios Detalhados', 'Análise Térmica', 'Redução de Custos'];
  if (title.toLowerCase().includes('monitoramento')) return ['Tempo Real', 'Alertas Automáticos', 'Histórico Completo'];
  if (title.toLowerCase().includes('segurança')) return ['Operação Noturna', 'Resposta Rápida', 'Equipe Certificada'];
  return ['Serviço Profissional', 'Qualidade Garantida', 'Suporte Técnico'];
};

export const ServicesSection: React.FC = () => {
  const { services: adminServices, isLoading } = useServices();
  
  // Usar dados do admin se disponíveis, senão usar dados estáticos
  const services = adminServices.length > 0 ? adminServices.map(service => ({
    icon: getIconComponent(service.icon, service.title),
    title: service.title,
    description: service.description,
    features: getServiceFeatures(service.title),
    id: service.id
  })) : staticServices;

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <Container>
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
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
            Nossos{' '}
            <span className="bg-gradient-sky bg-clip-text text-transparent">
              Serviços
            </span>
          </motion.h2>
          
          <motion.p
            className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Soluções completas em tecnologia de drones para atender 
            todas as suas necessidades com excelência e inovação.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer">
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-sky rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={32} className="text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-heading font-semibold text-xl text-tech-black dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-body text-drone-gray-500 dark:text-drone-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center text-sm text-primary"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-drone-gray-500 dark:text-drone-gray-400 mb-6">
            Precisa de um serviço personalizado?
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-sky text-white font-medium rounded-xl hover:shadow-drone transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Fale Conosco
          </motion.button>
        </motion.div>
      </Container>
    </section>
  );
};