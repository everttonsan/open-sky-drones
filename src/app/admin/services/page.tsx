'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { ServiceForm } from '@/components/forms';
import { Card, Button, TableSkeleton, LoadingOverlay, ErrorAlert, SuccessAlert } from '@/components/ui';
import { useServices } from '@/hooks/useServices';
import { Service } from '../../../../lib/supabase';

export default function ServicesAdmin() {
  const {
    services,
    isLoading,
    error,
    setError,
    createService,
    updateService,
    deleteService
  } = useServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSave = async (serviceData: Omit<Service, 'id' | 'created_at'>) => {
    setError('');
    setSuccessMessage('');

    try {
      if (editingService) {
        const result = await updateService(editingService.id, serviceData);
        if (result.success) {
          setSuccessMessage('Serviço atualizado com sucesso!');
        }
      } else {
        const result = await createService(serviceData);
        if (result.success) {
          setSuccessMessage('Serviço criado com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      setIsDeleting(id);
      setError('');
      setSuccessMessage('');
      
      const result = await deleteService(id);
      if (result.success) {
        setSuccessMessage('Serviço excluído com sucesso!');
      }
      
      setIsDeleting(null);
    }
  };

  return (
    <AdminLayout 
      title="Gerenciar Serviços" 
      subtitle="Adicione, edite e organize os serviços oferecidos"
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
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-drone-gray" size={18} />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            />
          </div>

          {/* Add Button */}
          <Button onClick={handleCreate}>
            <Plus size={18} className="mr-2" />
            Novo Serviço
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Total de Serviços</p>
                <p className="text-2xl font-bold text-drone-dark">{services.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Plus size={24} className="text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Serviços Ativos</p>
                <p className="text-2xl font-bold text-drone-dark">{services.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Edit size={24} className="text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Visualizações</p>
                <p className="text-2xl font-bold text-drone-dark">2.4k</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Search size={24} className="text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Services List */}
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-lg text-drone-dark mb-6">
            Lista de Serviços ({filteredServices.length})
          </h3>

          {isLoading ? (
            <TableSkeleton rows={4} columns={3} />
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service, index) => (
                <LoadingOverlay
                  key={service.id}
                  isLoading={isDeleting === service.id}
                  message="Excluindo serviço..."
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {service.icon === 'camera' ? '📸' : 
                             service.icon === 'video' ? '🎥' : 
                             service.icon === 'map' ? '🗺️' : '🔍'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-heading font-semibold text-drone-dark">{service.title}</h4>
                          <p className="text-sm text-drone-gray">Criado em {service.created_at}</p>
                        </div>
                      </div>
                      <p className="text-drone-gray leading-relaxed">{service.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-2 ml-4 mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(service)}
                        className="w-full sm:w-auto"
                      >
                        <Edit size={16} className="mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
                        onClick={() => handleDelete(service.id)}
                        disabled={isDeleting === service.id}
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

          {!isLoading && filteredServices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-drone-gray">Nenhum serviço encontrado.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Service Form Modal */}
      <ServiceForm
        service={editingService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </AdminLayout>
  );
}