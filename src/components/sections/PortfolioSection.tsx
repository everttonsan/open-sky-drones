'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ExternalLink } from 'lucide-react';
import { Container, LoadingSpinner } from '../ui';
import { usePortfolio } from '@/hooks/usePortfolio';

// Dados estáticos como fallback
const staticPortfolioItems = [
  {
    id: 1,
    title: 'Marina Luxury Resort',
    category: 'imobiliario',
    description: 'Captura aérea promocional de resort de luxo com vistas espetaculares da marina.'
  },
  {
    id: 2,
    title: 'Festival de Música 2024',
    category: 'eventos',
    description: 'Cobertura aérea completa do maior festival de música do ano.'
  },
  {
    id: 3,
    title: 'Inspeção Solar Industrial',
    category: 'inspecoes',
    description: 'Inspeção térmica de painéis solares industriais com análise detalhada.'
  },
  {
    id: 4,
    title: 'Mapeamento Rural - Fazenda São João',
    category: 'mapeamento',
    description: 'Mapeamento topográfico de 500 hectares com precisão centimétrica.'
  },
  {
    id: 5,
    title: 'Condomínio Residencial Premium',
    category: 'imobiliario',
    description: 'Tour aéreo promocional de condomínio residencial de alto padrão.'
  },
  {
    id: 6,
    title: 'Wedding Dreams - Casamento Aéreo',
    category: 'eventos',
    description: 'Cobertura aérea de casamento com momentos únicos e emocionantes.'
  },
  {
    id: 7,
    title: 'Torre de Telecomunicações',
    category: 'inspecoes',
    description: 'Inspeção detalhada de torre de telecomunicações com relatório completo.'
  },
  {
    id: 8,
    title: 'Área de Reflorestamento',
    category: 'mapeamento',
    description: 'Monitoramento de área de reflorestamento com análise de crescimento.'
  },
];

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'imobiliario', name: 'Imobiliário' },
  { id: 'eventos', name: 'Eventos' },
  { id: 'inspecoes', name: 'Inspeções' },
  { id: 'mapeamento', name: 'Mapeamento' },
];

export const PortfolioSection: React.FC = () => {
  const { portfolio: adminPortfolio, isLoading } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('todos');
  
  // Usar dados do admin se disponíveis, senão usar dados estáticos
  const portfolioItems = adminPortfolio.length > 0 ? adminPortfolio : staticPortfolioItems;
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filteredItems = activeCategory === 'todos' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <Container>
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
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
            Nosso{' '}
            <span className="bg-gradient-sky bg-clip-text text-transparent">
              Portfólio
            </span>
          </motion.h2>
          
          <motion.p
            className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Confira alguns dos nossos projetos mais recentes e veja a qualidade 
            que entregamos em cada trabalho.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-sky text-white shadow-drone'
                  : 'bg-white dark:bg-gray-700 text-drone-gray-500 dark:text-drone-gray-400 hover:text-primary hover:shadow-elevation'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-700 shadow-elevation hover:shadow-drone transition-all duration-300 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-sky-light/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white dark:bg-gray-700/80 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">
                            {item.category === 'imobiliario' ? '🏢' : 
                             item.category === 'eventos' ? '🎉' : 
                             item.category === 'inspecoes' ? '🔍' : '🗺️'}
                          </span>
                        </div>
                        <p className="text-primary font-medium text-sm">{item.title}</p>
                      </div>
                    </div>
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/80 transition-all duration-300 flex items-center justify-center">
                      <Play 
                        size={48} 
                        className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" 
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-lg text-tech-black dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-drone-gray-500 dark:text-drone-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-700 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={20} className="mr-2" />
            Ver Portfólio Completo
          </motion.button>
        </motion.div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white dark:bg-gray-700/90 rounded-full flex items-center justify-center text-tech-black dark:text-white hover:bg-white dark:bg-gray-700 transition-colors"
                  onClick={() => setSelectedItem(null)}
                >
                  <X size={20} />
                </button>
                
                {/* Video/Image */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-sky-light/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white dark:bg-gray-700/80 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">
                        {selectedItem.category === 'imobiliario' ? '🏢' : 
                         selectedItem.category === 'eventos' ? '🎉' : 
                         selectedItem.category === 'inspecoes' ? '🔍' : '🗺️'}
                      </span>
                    </div>
                    <p className="text-primary font-semibold text-lg">{selectedItem.title}</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="font-heading font-bold text-2xl text-tech-black dark:text-white mb-4">
                    {selectedItem.title}
                  </h3>
                  <p className="font-body text-lg text-drone-gray-500 dark:text-drone-gray-400 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};