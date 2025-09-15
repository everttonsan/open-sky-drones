'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '../ui/Container';

const faqs = [
  {
    question: 'Quais tipos de serviços de drone vocês oferecem?',
    answer: 'Oferecemos uma ampla gama de serviços, incluindo fotografia e vídeo aéreo, mapeamento topográfico, inspeções técnicas de estruturas, monitoramento agrícola, cobertura de eventos e projetos de marketing. Todos os serviços são realizados com equipamentos profissionais e pilotos certificados.'
  },
  {
    question: 'Vocês possuem todas as licenças necessárias?',
    answer: 'Sim, somos totalmente licenciados pela ANAC (Agência Nacional de Aviação Civil) e nossos pilotos possuem todas as certificações necessárias. Também temos seguro de responsabilidade civil para todos os nossos equipamentos e operações.'
  },
  {
    question: 'Qual é a qualidade das imagens e vídeos?',
    answer: 'Utilizamos drones profissionais com câmeras 4K e sensores de alta qualidade. Podemos capturar fotos em resolução até 48MP e vídeos em 4K/60fps, garantindo qualidade cinematográfica para todos os projetos.'
  },
  {
    question: 'Qual é o prazo de entrega dos projetos?',
    answer: 'O prazo varia dependendo do tipo e complexidade do projeto. Geralmente, entregamos fotos editadas em 3-5 dias úteis e vídeos editados em 7-10 dias úteis. Projetos de mapeamento podem levar de 5-15 dias, dependendo da área e análise necessária.'
  },
  {
    question: 'Vocês atendem em outras cidades?',
    answer: 'Sim, atendemos em todo o Brasil. Para projetos fora da região metropolitana de São Paulo, pode haver custos adicionais de deslocamento, que são calculados de acordo com a distância e duração do projeto.'
  },
  {
    question: 'Como funciona o processo de orçamento?',
    answer: 'O processo é simples: você entra em contato conosco descrevendo seu projeto, fazemos uma avaliação das necessidades, visitamos o local se necessário (para projetos grandes), e enviamos um orçamento detalhado dentro de 24-48 horas.'
  }
];

interface FAQItemProps {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div
      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md smooth-transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left focus-ring interactive-element smooth-transition hover:bg-gray-50"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-gray-900 pr-4">
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <Container>
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <HelpCircle className="text-primary" size={32} />
          </motion.div>
          
          <motion.h2
            className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Perguntas Frequentes
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tire suas dúvidas sobre nossos serviços de drone. 
            Se não encontrar a resposta que procura, entre em contato conosco.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            Ainda tem dúvidas? Nossa equipe está pronta para ajudar!
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-primary hover:text-primary/80 font-semibold smooth-transition focus-ring"
          >
            Entre em contato conosco →
          </button>
        </motion.div>
      </Container>
    </section>
  );
};