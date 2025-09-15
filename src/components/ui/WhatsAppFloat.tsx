'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mostrar tooltip automaticamente após alguns segundos
  useEffect(() => {
    if (isVisible && !showTooltip) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, showTooltip]);

  const openWhatsApp = () => {
    const message = "Olá! Gostaria de solicitar um orçamento para serviços de drone.";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowTooltip(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 bg-white shadow-drone rounded-2xl p-4 max-w-xs"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className="absolute top-2 right-2 text-drone-gray hover:text-drone-dark"
                  onClick={() => setShowTooltip(false)}
                >
                  <X size={16} />
                </button>
                
                <div className="pr-6">
                  <h4 className="font-heading font-semibold text-drone-dark mb-1">
                    Precisa de ajuda?
                  </h4>
                  <p className="font-body text-sm text-drone-gray mb-3">
                    Fale conosco no WhatsApp e solicite seu orçamento!
                  </p>
                  
                  <button
                    onClick={openWhatsApp}
                    className="text-green-600 font-body font-medium text-sm hover:underline"
                  >
                    Conversar agora →
                  </button>
                </div>
                
                {/* Arrow */}
                <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-drone flex items-center justify-center transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openWhatsApp}
            animate={showTooltip ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: showTooltip ? 3 : 0 }}
          >
            <MessageCircle size={24} />
          </motion.button>

          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 bg-green-500 rounded-full -z-10"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};