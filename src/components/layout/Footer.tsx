'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '../ui/Container';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

const services = [
  'Fotografia Aérea',
  'Mapeamento',
  'Inspeções',
  'Vídeo Aéreo',
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo e Descrição */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/images/logo.jpeg" 
                  alt="Open Sky Drones Logo" 
                  className="w-12 h-12 object-contain rounded-lg"
                />
                <div>
                  <h3 className="font-heading font-bold text-2xl">Open Sky Drones</h3>
                  <p className="text-drone-gray-400 dark:text-drone-gray-300">Capturando sua visão do céu</p>
                </div>
              </div>
              
              <p className="text-drone-gray-400 dark:text-drone-gray-300 leading-relaxed mb-6 max-w-md">
                Oferecemos serviços profissionais de drone com tecnologia de ponta, 
                proporcionando perspectivas únicas e soluções inovadoras para seus projetos.
              </p>
              
              {/* Redes Sociais */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="touch-target interactive-element w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary smooth-transition focus-ring"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    aria-label={`Seguir no ${social.name}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Serviços */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-semibold text-lg mb-6">Serviços</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <button className="text-drone-gray-400 dark:text-drone-gray-300 hover:text-primary transition-colors duration-200">
                      {service}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contato */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-semibold text-lg mb-6">Contato</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-primary" />
                  <span className="text-drone-gray-400 dark:text-drone-gray-300">contato@opensyydrones.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-primary" />
                  <span className="text-drone-gray-400 dark:text-drone-gray-300">(11) 99999-9999</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-primary mt-1" />
                  <span className="text-drone-gray-400 dark:text-drone-gray-300">
                    São Paulo, SP<br />
                    Brasil
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.p
              className="text-drone-gray-400 dark:text-drone-gray-300 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © 2024 Open Sky Drones. Todos os direitos reservados.
            </motion.p>
            <motion.div
              className="flex space-x-6 mt-4 sm:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button className="text-drone-gray-400 dark:text-drone-gray-300 hover:text-primary text-sm transition-colors duration-200">
                Política de Privacidade
              </button>
              <button className="text-drone-gray-400 dark:text-drone-gray-300 hover:text-primary text-sm transition-colors duration-200">
                Termos de Uso
              </button>
            </motion.div>
          </div>
        </div>
      </Container>
    </footer>
  );
};