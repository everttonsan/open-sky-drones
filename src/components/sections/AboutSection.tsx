'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield, Zap, Target } from 'lucide-react';
import { Container, Card } from '../ui';

const features = [
  {
    icon: Award,
    title: 'Certificação ANAC',
    description: 'Operadores certificados pela Agência Nacional de Aviação Civil'
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description: 'Profissionais com anos de experiência em operações de drone'
  },
  {
    icon: Clock,
    title: 'Agilidade',
    description: 'Entrega rápida sem comprometer a qualidade dos resultados'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Seguros e protocolos rigorosos em todas as operações'
  },
  {
    icon: Zap,
    title: 'Tecnologia Avançada',
    description: 'Equipamentos de última geração para resultados superiores'
  },
  {
    icon: Target,
    title: 'Precisão',
    description: 'Resultados precisos adaptados às suas necessidades específicas'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="lg:pr-8">
            <motion.h2
              className="font-heading font-bold text-3xl md:text-4xl text-tech-black dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Por que escolher a{' '}
              <span className="bg-gradient-sky bg-clip-text text-transparent">
                Open Sky Drones?
              </span>
            </motion.h2>
            
            <motion.p
              className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Somos uma empresa especializada em soluções de drone com foco na 
              excelência operacional e inovação tecnológica. Nossa missão é 
              proporcionar perspectivas únicas e insights valiosos através da 
              captura aérea profissional.
            </motion.p>

            <motion.p
              className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Com anos de experiência no mercado e uma equipe de pilotos certificados, 
              oferecemos serviços personalizados que atendem desde pequenas empresas 
              até grandes corporações, sempre priorizando a segurança e qualidade.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary mb-2">500+</div>
                <div className="font-body text-drone-gray-500 dark:text-drone-gray-400">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary mb-2">50+</div>
                <div className="font-body text-drone-gray-500 dark:text-drone-gray-400">Clientes Atendidos</div>
              </div>
            </motion.div>

            <motion.button
              className="inline-flex items-center px-8 py-4 bg-gradient-sky text-white font-medium rounded-xl hover:shadow-drone transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Conheça Nossos Serviços
            </motion.button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full">
                  <div className="w-12 h-12 bg-gradient-sky rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={24} className="text-white" />
                  </div>
                  
                  <h3 className="font-heading font-semibold text-lg text-tech-black dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="font-body text-drone-gray-500 dark:text-drone-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};