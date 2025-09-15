'use client';

import { useState, useEffect } from 'react';
import { supabase, Service } from '../../lib/supabase';

// Mock data para desenvolvimento
const mockServices: Service[] = [
  {
    id: '1',
    title: 'Fotografia Aérea',
    description: 'Captura de imagens aéreas profissionais para eventos, imóveis, marketing e documentação com qualidade cinematográfica.',
    icon: 'camera',
    image_url: undefined,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Vídeo Aéreo',
    description: 'Produção de vídeos aéreos cinematográficos para campanhas publicitárias, documentários e eventos especiais.',
    icon: 'video',
    image_url: undefined,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Mapeamento',
    description: 'Mapeamento topográfico e ortofotografias de precisão para construção civil, agricultura e planejamento urbano.',
    icon: 'map',
    image_url: undefined,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Inspeções',
    description: 'Inspeções técnicas seguras em torres, telhados, painéis solares e estruturas industriais de difícil acesso.',
    icon: 'search',
    image_url: undefined,
    created_at: new Date().toISOString()
  }
];

// Simular localStorage para persistência
const STORAGE_KEY = 'open-sky-services';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Verificar se é ambiente de demo (sem Supabase configurado)
  const isDemoMode = process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co';

  // Carregar serviços
  const loadServices = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const stored = localStorage.getItem(STORAGE_KEY);
        const data = stored ? JSON.parse(stored) : mockServices;
        setServices(data);
        
        // Salvar dados mock se não existirem
        if (!stored) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mockServices));
        }
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        setServices(data || []);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar serviços';
      setError(errorMsg);
      console.error('Erro ao carregar serviços:', err);
      
      // Fallback para dados mock em caso de erro
      setServices(mockServices);
    } finally {
      setIsLoading(false);
    }
  };

  // Criar serviço
  const createService = async (serviceData: Omit<Service, 'id' | 'created_at'>) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const newService: Service = {
          ...serviceData,
          id: Date.now().toString(),
          created_at: new Date().toISOString()
        };
        
        const newServices = [newService, ...services];
        setServices(newServices);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newServices));
        
        return { success: true, data: newService };
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('services')
          .insert([serviceData])
          .select()
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setServices(prev => [data, ...prev]);
        return { success: true, data };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao criar serviço';
      setError(errorMsg);
      console.error('Erro ao criar serviço:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Atualizar serviço
  const updateService = async (id: string, serviceData: Omit<Service, 'id' | 'created_at'>) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const updatedServices = services.map(service => 
          service.id === id 
            ? { ...service, ...serviceData }
            : service
        );
        
        setServices(updatedServices);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServices));
        
        const updatedService = updatedServices.find(s => s.id === id);
        return { success: true, data: updatedService };
      } else {
        // Modo produção: usar Supabase
        const { data, error: supabaseError } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id)
          .select()
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setServices(prev => prev.map(service => 
          service.id === id ? data : service
        ));
        return { success: true, data };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar serviço';
      setError(errorMsg);
      console.error('Erro ao atualizar serviço:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Excluir serviço
  const deleteService = async (id: string) => {
    try {
      if (isDemoMode) {
        // Modo demo: usar localStorage
        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
        const filteredServices = services.filter(service => service.id !== id);
        
        setServices(filteredServices);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredServices));
        
        return { success: true };
      } else {
        // Modo produção: usar Supabase
        const { error: supabaseError } = await supabase
          .from('services')
          .delete()
          .eq('id', id);

        if (supabaseError) {
          throw supabaseError;
        }

        setServices(prev => prev.filter(service => service.id !== id));
        return { success: true };
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao excluir serviço';
      setError(errorMsg);
      console.error('Erro ao excluir serviço:', err);
      return { success: false, error: errorMsg };
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    loadServices();
  }, []);

  return {
    services,
    isLoading,
    error,
    setError,
    loadServices,
    createService,
    updateService,
    deleteService
  };
}