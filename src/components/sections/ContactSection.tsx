'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Container, Card, Button, ErrorAlert, SuccessAlert } from '../ui';
import { useTracking } from '../tracking/Analytics';

// Schema de validação
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    info: 'contato@opensydrones.com',
    link: 'mailto:contato@opensydrones.com'
  },
  {
    icon: Phone,
    title: 'Telefone',
    info: '(11) 99999-9999',
    link: 'tel:+5511999999999'
  },
  {
    icon: MapPin,
    title: 'Localização',
    info: 'São Paulo, SP - Brasil',
    link: '#'
  },
];

export const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { trackLead, trackContact } = useTracking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao enviar mensagem');
      }

      setSuccessMessage(result.message || 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
      trackLead();
      trackContact();
      reset();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      setErrorMessage(`Erro ao enviar mensagem: ${errorMsg}. Tente novamente.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = "Olá! Gostaria de solicitar um orçamento para serviços de drone.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
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
            Entre em{' '}
            <span className="bg-gradient-sky bg-clip-text text-transparent">
              Contato
            </span>
          </motion.h2>
          
          <motion.p
            className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Pronto para elevar seu projeto? Fale conosco e descubra como 
            nossos serviços de drone podem transformar sua visão em realidade.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="lg:pr-8">
            <motion.h3
              className="font-heading font-semibold text-2xl text-tech-black dark:text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Vamos conversar sobre seu projeto
            </motion.h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.link}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-sky-light/10 dark:hover:bg-primary/10 transition-colors duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-sky rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-tech-black dark:text-white group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-body text-drone-gray-500 dark:text-drone-gray-400">{item.info}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              className="p-6 bg-gradient-sky rounded-2xl text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <MessageSquare size={32} className="mr-3" />
                <div>
                  <h4 className="font-heading font-semibold text-lg">Atendimento Rápido</h4>
                  <p className="text-white/90">Fale conosco no WhatsApp</p>
                </div>
              </div>
              
              <Button
                variant="secondary"
                onClick={openWhatsApp}
                className="w-full bg-white text-primary hover:bg-white/90"
              >
                <MessageSquare size={20} className="mr-2" />
                Chamar no WhatsApp
              </Button>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 sm:p-6 md:p-8">
              <h3 className="font-heading font-semibold text-2xl text-tech-black dark:text-white mb-6">
                Solicite seu orçamento
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="block font-body font-medium text-tech-black dark:text-white mb-2">
                    Nome completo *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 min-h-[44px] border border-drone-gray-300 dark:border-drone-gray-600 bg-white dark:bg-gray-800 text-tech-black dark:text-white placeholder-drone-gray-400 dark:placeholder-drone-gray-500 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-body font-medium text-tech-black dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 min-h-[44px] border border-drone-gray-300 dark:border-drone-gray-600 bg-white dark:bg-gray-800 text-tech-black dark:text-white placeholder-drone-gray-400 dark:placeholder-drone-gray-500 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Telefone */}
                <div>
                  <label className="block font-body font-medium text-tech-black dark:text-white mb-2">
                    Telefone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 min-h-[44px] border border-drone-gray-300 dark:border-drone-gray-600 bg-white dark:bg-gray-800 text-tech-black dark:text-white placeholder-drone-gray-400 dark:placeholder-drone-gray-500 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block font-body font-medium text-tech-black dark:text-white mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 border border-drone-gray-300 dark:border-drone-gray-600 bg-white dark:bg-gray-800 text-tech-black dark:text-white rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                    placeholder="Conte-nos sobre seu projeto e como podemos ajudar..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  <Send size={20} className="mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>

                {/* Success/Error Messages */}
                <div className="space-y-3">
                  <SuccessAlert 
                    message={successMessage} 
                    onDismiss={() => setSuccessMessage('')} 
                  />
                  <ErrorAlert 
                    error={errorMessage} 
                    onDismiss={() => setErrorMessage('')} 
                  />
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};