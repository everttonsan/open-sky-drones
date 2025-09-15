'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Star, User } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { Testimonial } from '../../../lib/supabase';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (testimonialData: Omit<Testimonial, 'id' | 'created_at'>) => Promise<void>;
  isLoading?: boolean;
}

export function TestimonialForm({ testimonial, isOpen, onClose, onSave, isLoading = false }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_photo: '',
    testimonial: '',
    rating: 5
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        client_name: testimonial.client_name,
        client_photo: testimonial.client_photo || '',
        testimonial: testimonial.testimonial,
        rating: testimonial.rating
      });
    } else {
      setFormData({
        client_name: '',
        client_photo: '',
        testimonial: '',
        rating: 5
      });
    }
    setErrors({});
  }, [testimonial, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Nome do cliente é obrigatório';
    } else if (formData.client_name.length < 2) {
      newErrors.client_name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.testimonial.trim()) {
      newErrors.testimonial = 'Depoimento é obrigatório';
    } else if (formData.testimonial.length < 10) {
      newErrors.testimonial = 'Depoimento deve ter pelo menos 10 caracteres';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Avaliação deve ser entre 1 e 5 estrelas';
    }

    if (formData.client_photo && !isValidUrl(formData.client_photo)) {
      newErrors.client_photo = 'URL da foto deve ser válida';
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
        client_name: formData.client_name.trim(),
        client_photo: formData.client_photo.trim() || undefined,
        testimonial: formData.testimonial.trim(),
        rating: formData.rating
      });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar depoimento:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStars = (rating: number, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange?.(star)}
            disabled={isSaving || !onRatingChange}
            className={`p-1 transition-colors duration-200 ${
              onRatingChange ? 'hover:text-yellow-500' : ''
            } ${
              star <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            <Star size={20} fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    );
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
                {testimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
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
              {/* Nome do Cliente */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => handleChange('client_name', e.target.value)}
                  placeholder="Ex: Maria Santos"
                  disabled={isSaving}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                    errors.client_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.client_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.client_name}</p>
                )}
              </div>

              {/* URL da Foto (opcional) */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  URL da Foto do Cliente (opcional)
                </label>
                <div className="space-y-2">
                  <input
                    type="url"
                    value={formData.client_photo}
                    onChange={(e) => handleChange('client_photo', e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                    disabled={isSaving}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                      errors.client_photo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  
                  {/* Photo Preview */}
                  {formData.client_photo && isValidUrl(formData.client_photo) && (
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={formData.client_photo} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full flex items-center justify-center">
                          <User size={20} className="text-gray-400" />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">Preview da foto</span>
                    </div>
                  )}
                </div>
                {errors.client_photo && (
                  <p className="text-red-600 text-sm mt-1">{errors.client_photo}</p>
                )}
              </div>

              {/* Depoimento */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Depoimento *
                </label>
                <textarea
                  value={formData.testimonial}
                  onChange={(e) => handleChange('testimonial', e.target.value)}
                  placeholder="Escreva aqui o depoimento do cliente..."
                  rows={4}
                  disabled={isSaving}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none ${
                    errors.testimonial ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.testimonial && (
                  <p className="text-red-600 text-sm mt-1">{errors.testimonial}</p>
                )}
              </div>

              {/* Avaliação */}
              <div>
                <label className="block text-sm font-medium text-drone-dark mb-2">
                  Avaliação *
                </label>
                <div className="flex items-center space-x-3">
                  {renderStars(formData.rating, (rating) => handleChange('rating', rating))}
                  <span className="text-sm text-gray-600">
                    {formData.rating} de 5 estrelas
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-red-600 text-sm mt-1">{errors.rating}</p>
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
                      {testimonial ? 'Atualizar' : 'Criar'}
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