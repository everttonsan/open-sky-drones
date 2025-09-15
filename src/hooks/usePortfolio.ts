'use client';

import { useState, useEffect } from 'react';
import { supabase, Portfolio } from '../../lib/supabase';

// Mock data para desenvolvimento
const mockPortfolio: Portfolio[] = [
  {
    id: '1',
    title: 'Marina Luxury Resort',
    description: 'Captura aérea promocional de resort de luxo com vistas espetaculares da marina.',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    video_url: undefined,
    category: 'imobiliario',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Festival de Música 2024',
    description: 'Cobertura aérea completa do maior festival de música do ano.',
    image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
    video_url: 'https://example.com/video.mp4',
    category: 'eventos',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Inspeção Solar Industrial',
    description: 'Inspeção térmica de painéis solares industriais com análise detalhada.',
    image_url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=500',
    video_url: undefined,
    category: 'inspecoes',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Mapeamento Rural - Fazenda São João',
    description: 'Mapeamento topográfico de 500 hectares com precisão centimétrica.',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500',
    video_url: undefined,
    category: 'mapeamento',
    created_at: new Date().toISOString()
  }
];

// Simular localStorage para persistência
const STORAGE_KEY = 'open-sky-portfolio';

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Verificar se é ambiente de demo (sem Supabase configurado)
  const isDemoMode = process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co';

  // Carregar portfólio
  const loadPortfolio = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const stored = localStorage.getItem(STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : mockPortfolio;
        setPortfolio(data);
        
        // Salvar dados mock se não existirem
        if (!stored) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPortfolio));
        }
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('portfolio')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        setPortfolio(data || []);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar portfólio';
      setError(errorMsg);
      console.error('Erro ao carregar portfólio:', err);
      
      // Fallback para dados mock em caso de erro
      setPortfolio(mockPortfolio);
    } finally {
      setIsLoading(false);
    }
  };

  // Criar projeto
  const createProject = async (projectData: Omit<Portfolio, 'id' | 'created_at'>) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const newProject: Portfolio = {
          ...projectData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        };
        
        const newPortfolio = [newProject, ...portfolio];
        setPortfolio(newPortfolio);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPortfolio));
        
        return { success: true, data: newProject };
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('portfolio')
          .insert([projectData])
          .select()
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setPortfolio(prev => [data, ...prev]);
        return { success: true, data };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao criar projeto';
      setError(errorMsg);
      console.error('Erro ao criar projeto:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Atualizar projeto
  const updateProject = async (id: string, projectData: Omit<Portfolio, 'id' | 'created_at'>) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const updatedPortfolio = portfolio.map(project => 
          project.id === id 
            ? { ...project, ...projectData }
            : project
        );
        
        setPortfolio(updatedPortfolio);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPortfolio));
        
        const updatedProject = updatedPortfolio.find(p => p.id === id);
        return { success: true, data: updatedProject };
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('portfolio')
          .update(projectData)
          .eq('id', id)
          .select()
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setPortfolio(prev => prev.map(project => 
          project.id === id ? data : project
        ));
        return { success: true, data };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar projeto';
      setError(errorMsg);
      console.error('Erro ao atualizar projeto:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Excluir projeto
  const deleteProject = async (id: string) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const filteredPortfolio = portfolio.filter(project => project.id !== id);
        
        setPortfolio(filteredPortfolio);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPortfolio));
        
        return { success: true };
      } else {
        // Modo produção: usar Supabase
        const { error: supabaseError } = await supabase
          .from('portfolio')
          .delete()
          .eq('id', id);

        if (supabaseError) {
          throw supabaseError;
        }

        setPortfolio(prev => prev.filter(project => project.id !== id));
        return { success: true };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao excluir projeto';
      setError(errorMsg);
      console.error('Erro ao excluir projeto:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    loadPortfolio();
  }, []);

  return {
    portfolio,
    isLoading,
    error,
    setError,
    loadPortfolio,
    createProject,
    updateProject,
    deleteProject
  };
}