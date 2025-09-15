'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { Portfolio } from '../../../lib/supabase';

interface PortfolioFormProps {
  project?: Portfolio | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Omit<Portfolio, 'id' | 'created_at'>) => Promise<void>;
  isLoading?: boolean;
}

const categoryOptions = [
  { value: 'imobiliario', label: 'Imobiliário' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'inspecoes', label: 'Inspeções' },
  { value: 'mapeamento', label: 'Mapeamento' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'documentario', label: 'Documentário' }
];

export function PortfolioForm({ project, isOpen, onClose, onSave, isLoading = false }: PortfolioFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    video_url: '',
    category: 'imobiliario'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        image_url: project.image_url || '',
        video_url: project.video_url || '',
        category: project.category
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image_url: '',
        video_url: '',
        category: 'imobiliario'
      });
    }
    setErrors({});
  }, [project, isOpen]);

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

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'URL da imagem é obrigatória';
    } else if (!isValidUrl(formData.image_url)) {
      newErrors.image_url = 'URL da imagem deve ser válida';
    }

    if (formData.video_url && !isValidUrl(formData.video_url)) {
      newErrors.video_url = 'URL do vídeo deve ser válida';
    }

    if (!formData.category) {
      newErrors.category = 'Selecione uma categoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
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
        image_url: formData.image_url.trim(),
        video_url: formData.video_url.trim() || undefined,
        category: formData.category
      });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
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
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-xl text-drone-dark">
                {project ? 'Editar Projeto' : 'Novo Projeto'}
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
                  Título do Projeto *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Ex: Marina Luxury Resort"
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
                  placeholder="Descreva detalhadamente este projeto..."
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

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  disabled={isSaving}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 bg-white ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* URL da Imagem */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  URL da Imagem *
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    disabled={isSaving}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                      errors.image_url ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  
                  {/* Image Preview */}
                  {formData.image_url && isValidUrl(formData.image_url) && (
                    <div className="relative">
                      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={formData.image_url} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon size={32} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Erro ao carregar imagem</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {errors.image_url && (
                  <p className="text-red-600 text-sm mt-1">{errors.image_url}</p>
                )}
              </div>

              {/* URL do Vídeo (opcional) */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  URL do Vídeo (opcional)
                </label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => handleChange('video_url', e.target.value)}
                  placeholder="https://exemplo.com/video.mp4"
                  disabled={isSaving}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                    errors.video_url ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.video_url && (
                  <p className="text-red-600 text-sm mt-1">{errors.video_url}</p>
                )}
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
                      {project ? 'Atualizar' : 'Criar'}
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