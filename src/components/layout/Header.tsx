'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-800/20'
          : 'bg-transparent'
      }`}
    >
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('main-content')}
            className="cursor-pointer flex items-center"
          >
            <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-200 relative z-10 ${
              isScrolled
                ? 'text-gray-900 dark:text-white'
                : 'text-white drop-shadow-lg'
            }`}
            style={{
              textShadow: !isScrolled ? '2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' : undefined
            }}>
              Open Sky Drones
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className={`font-medium hover:text-primary transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-white text-shadow-light'
              }`}
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`font-medium hover:text-primary transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-white text-shadow-light'
              }`}
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`font-medium hover:text-primary transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-white text-shadow-light'
              }`}
            >
              Contato
            </button>

            <ThemeToggle />

            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
              className="ml-4"
            >
              Solicitar Orçamento
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-200 ${
                isScrolled
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <nav className="py-2">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-6 py-3 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Contato
              </button>
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800">
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="sm"
                  className="w-full"
                >
                  Solicitar Orçamento
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};