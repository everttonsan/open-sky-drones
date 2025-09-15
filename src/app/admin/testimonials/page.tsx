'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Star, User } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { TestimonialForm } from '@/components/forms';
import { Card, Button, LoadingOverlay, ErrorAlert, SuccessAlert } from '@/components/ui';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Testimonial } from '../../../../lib/supabase';

export default function TestimonialsAdmin() {
  const {
    testimonials,
    isLoading,
    error,
    setError,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
  } = useTestimonials();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estatísticas
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '0.0';
  
  const positivePercentage = testimonials.length > 0
    ? Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)
    : 0;

  const handleCreate = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleSave = async (testimonialData: Omit<Testimonial, 'id' | 'created_at'>) => {
    setError('');
    setSuccessMessage('');

    try {
      if (editingTestimonial) {
        const result = await updateTestimonial(editingTestimonial.id, testimonialData);
        if (result.success) {
          setSuccessMessage('Depoimento atualizado com sucesso!');
        }
      } else {
        const result = await createTestimonial(testimonialData);
        if (result.success) {
          setSuccessMessage('Depoimento criado com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar depoimento:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      setIsDeleting(id);
      setError('');
      setSuccessMessage('');
      
      const result = await deleteTestimonial(id);
      if (result.success) {
        setSuccessMessage('Depoimento excluído com sucesso!');
      }
      
      setIsDeleting(null);
    }
  };

  return (
    <AdminLayout 
      title="Gerenciar Depoimentos" 
      subtitle="Gerencie feedback e avaliações dos clientes"
    >
      <div className="space-y-6">
        {/* Alerts */}
        <div className="space-y-3">
          <SuccessAlert 
            message={successMessage} 
            onDismiss={() => setSuccessMessage('')} 
          />
          <ErrorAlert 
            error={error} 
            onDismiss={() => setError('')} 
          />
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-drone-gray" size={18} />
            <input
              type="text"
              placeholder="Buscar depoimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            />
          </div>
          <Button onClick={handleCreate}>
            <Plus size={18} className="mr-2" />
            Novo Depoimento
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-drone-dark">{testimonials.length}</p>
              <p className="text-sm text-drone-gray">Total</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{averageRating}</p>
              <p className="text-sm text-drone-gray">Avaliação Média</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{positivePercentage}%</p>
              <p className="text-sm text-drone-gray">Positivos</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">24h</p>
              <p className="text-sm text-drone-gray">Resposta</p>
            </div>
          </Card>
        </div>

        {/* Testimonials List */}
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-lg text-drone-dark mb-6">
            Lista de Depoimentos ({filteredTestimonials.length})
          </h3>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-24" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTestimonials.map((testimonial, index) => (
                <LoadingOverlay
                  key={testimonial.id}
                  isLoading={isDeleting === testimonial.id}
                  message="Excluindo depoimento..."
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-sky rounded-full flex items-center justify-center overflow-hidden">
                          {testimonial.client_photo ? (
                            <img 
                              src={testimonial.client_photo} 
                              alt={testimonial.client_name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`${testimonial.client_photo ? 'hidden' : ''} text-white font-semibold`}>
                            {testimonial.client_name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-drone-dark">{testimonial.client_name}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-drone-gray ml-2">
                              {new Date(testimonial.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-drone-gray italic">"{testimonial.testimonial}"</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-2 ml-4 mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(testimonial)}
                        className="w-full sm:w-auto"
                      >
                        <Edit size={16} className="mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={isDeleting === testimonial.id}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </motion.div>
                </LoadingOverlay>
              ))}
            </div>
          )}

          {!isLoading && filteredTestimonials.length === 0 && (
            <div className="text-center py-8">
              <p className="text-drone-gray">Nenhum depoimento encontrado.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Testimonial Form Modal */}
      <TestimonialForm
        testimonial={editingTestimonial}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </AdminLayout>
  );
}