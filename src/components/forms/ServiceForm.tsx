'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { Service } from '../../../lib/supabase';

interface ServiceFormProps {
  service?: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: Omit<Service, 'id' | 'created_at'>) => Promise<void>;
  isLoading?: boolean;
}

const iconOptions = [
  { value: 'camera', label: 'Câmera 📸', emoji: '📸' },
  { value: 'video', label: 'Vídeo 🎥', emoji: '🎥' },
  { value: 'map', label: 'Mapa 🗺️', emoji: '🗺️' },
  { value: 'search', label: 'Inspeção 🔍', emoji: '🔍' },
  { value: 'drone', label: 'Drone 🚁', emoji: '🚁' },
  { value: 'tower', label: 'Torre 🏗️', emoji: '🏗️' }
];

export function ServiceForm({ service, isOpen, onClose, onSave, isLoading = false }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'camera',
    image_url: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        image_url: service.image_url || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: 'camera',
        image_url: ''
      });
    }
    setErrors({});
  }, [service, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Título deve ter pelo menos 3 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Descrição deve ter pelo menos 10 caracteres';
    }

    if (!formData.icon) {
      newErrors.icon = 'Selecione um ícone';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
        image_url: formData.image_url.trim() || undefined
      });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg"
        >
          <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-xl text-drone-dark">
                {service ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>
              <button
                onClick={onClose}
                disabled={isSaving}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-drone-gray" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Título do Serviço *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Ex: Fotografia Aérea"
                  disabled={isSaving}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Descreva detalhadamente este serviço..."
                  rows={4}
                  disabled={isSaving}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Ícone */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Ícone *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('icon', option.value)}
                      disabled={isSaving}
                      className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
                        formData.icon === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{option.emoji}</div>
                      <div className="text-xs">{option.value}</div>
                    </button>
                  ))}
                </div>
                {errors.icon && (
                  <p className="text-red-600 text-sm mt-1">{errors.icon}</p>
                )}
              </div>

              {/* URL da Imagem (opcional) */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  URL da Imagem (opcional)
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  disabled={isSaving}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {service ? 'Atualizar' : 'Criar'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}