'use client';

import { useState, useEffect } from 'react';
import { supabase, Testimonial } from '../../lib/supabase';

// Mock data para desenvolvimento
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Maria Santos',
    client_photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b932?w=100&h=100&fit=crop&crop=face',
    testimonial: 'Excelente trabalho! As fotos aéreas do nosso evento ficaram espetaculares. Profissionais muito competentes.',
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    client_name: 'João Silva',
    client_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    testimonial: 'Contratei para mapeamento da minha propriedade rural. Resultado perfeito e dentro do prazo.',
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    client_name: 'Ana Costa',
    client_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    testimonial: 'Inspeção do telhado da empresa foi realizada com muita precisão. Recomendo!',
    rating: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    client_name: 'Carlos Oliveira',
    client_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    testimonial: 'Serviço de qualidade e atendimento excepcional. As imagens superaram as expectativas.',
    rating: 5,
    created_at: new Date().toISOString()
  }
];

// Simular localStorage para persistência
const STORAGE_KEY = 'open-sky-testimonials';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Verificar se é ambiente de demo (sem Supabase configurado)
  const isDemoMode = process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co';

  // Carregar depoimentos
  const loadTestimonials = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const stored = localStorage.getItem(STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : mockTestimonials;
        setTestimonials(data);
        
        // Salvar dados mock se não existirem
        if (!stored) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTestimonials));
        }
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        setTestimonials(data || []);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar depoimentos';
      setError(errorMsg);
      console.error('Erro ao carregar depoimentos:', err);
      
      // Fallback para dados mock em caso de erro
      setTestimonials(mockTestimonials);
    } finally {
      setIsLoading(false);
    }
  };

  // Criar depoimento
  const createTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const newTestimonial: Testimonial = {
          ...testimonialData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        };
        
        const newTestimonials = [newTestimonial, ...testimonials];
        setTestimonials(newTestimonials);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTestimonials));
        
        return { success: true, data: newTestimonial };
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('testimonials')
          .insert([testimonialData])
          .select()
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setTestimonials(prev => [data, ...prev]);
        return { success: true, data };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao criar depoimento';
      setError(errorMsg);
      console.error('Erro ao criar depoimento:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Atualizar depoimento
  const updateTestimonial = async (id: string, testimonialData: Omit<Testimonial, 'id' | 'created_at'>) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const updatedTestimonials = testimonials.map(testimonial => 
          testimonial.id === id 
            ? { ...testimonial, ...testimonialData }
            : testimonial
        );
        
        setTestimonials(updatedTestimonials);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTestimonials));
        
        const updatedTestimonial = updatedTestimonials.find(t => t.id === id);
        return { success: true, data: updatedTestimonial };
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', id)
          .select()
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setTestimonials(prev => prev.map(testimonial => 
          testimonial.id === id ? data : testimonial
        ));
        return { success: true, data };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar depoimento';
      setError(errorMsg);
      console.error('Erro ao atualizar depoimento:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Excluir depoimento
  const deleteTestimonial = async (id: string) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
        
        setTestimonials(filteredTestimonials);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTestimonials));
        
        return { success: true };
      } else {
        // Modo produção: usar Supabase
        const { error: supabaseError } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id);

        if (supabaseError) {
          throw supabaseError;
        }

        setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
        return { success: true };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao excluir depoimento';
      setError(errorMsg);
      console.error('Erro ao excluir depoimento:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    loadTestimonials();
  }, []);

  return {
    testimonials,
    isLoading,
    error,
    setError,
    loadTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
  };
}