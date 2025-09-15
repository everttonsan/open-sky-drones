'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { PortfolioForm } from '@/components/forms';
import { Card, Button, LoadingOverlay, ErrorAlert, SuccessAlert } from '@/components/ui';
import { usePortfolio } from '@/hooks/usePortfolio';
import { Portfolio } from '../../../../lib/supabase';

const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'imobiliario', name: 'Imobiliário' },
  { id: 'eventos', name: 'Eventos' },
  { id: 'inspecoes', name: 'Inspeções' },
  { id: 'mapeamento', name: 'Mapeamento' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'documentario', name: 'Documentário' }
];

export default function PortfolioAdmin() {
  const {
    portfolio,
    isLoading,
    error,
    setError,
    createProject,
    updateProject,
    deleteProject
  } = usePortfolio();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Portfolio | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredPortfolio = portfolio.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Portfolio) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSave = async (projectData: Omit<Portfolio, 'id' | 'created_at'>) => {
    setError('');
    setSuccessMessage('');

    try {
      if (editingProject) {
        const result = await updateProject(editingProject.id, projectData);
        if (result.success) {
          setSuccessMessage('Projeto atualizado com sucesso!');
        }
      } else {
        const result = await createProject(projectData);
        if (result.success) {
          setSuccessMessage('Projeto criado com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item do portfólio?')) {
      setIsDeleting(id);
      setError('');
      setSuccessMessage('');
      
      const result = await deleteProject(id);
      if (result.success) {
        setSuccessMessage('Projeto excluído com sucesso!');
      }
      
      setIsDeleting(null);
    }
  };

  const getCategoryStats = () => {
    return categories.slice(1).map(cat => ({
      ...cat,
      count: portfolio.filter(item => item.category === cat.id).length
    }));
  };

  return (
    <AdminLayout 
      title="Gerenciar Portfólio" 
      subtitle="Organize e apresente seus melhores trabalhos"
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-drone-gray" size={18} />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-drone-gray" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 bg-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Button */}
          <Button onClick={handleCreate}>
            <Plus size={18} className="mr-2" />
            Novo Projeto
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Total</p>
                <p className="text-xl font-bold text-drone-dark">{portfolio.length}</p>
              </div>
              <ImageIcon size={20} className="text-blue-500" />
            </div>
          </Card>

          {getCategoryStats().slice(0, 3).map((stat, index) => (
            <Card key={stat.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-drone-gray mb-1">{stat.name}</p>
                  <p className="text-xl font-bold text-drone-dark">{stat.count}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-green-500' :
                  index === 1 ? 'bg-purple-500' : 'bg-orange-500'
                }`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Portfolio Grid */}
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-lg text-drone-dark mb-6">
            Projetos ({filteredPortfolio.length})
          </h3>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPortfolio.map((item, index) => (
                <LoadingOverlay
                  key={item.id}
                  isLoading={isDeleting === item.id}
                  message="Excluindo projeto..."
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative bg-gray-100 rounded-xl overflow-hidden"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`${item.image_url ? 'hidden' : ''} flex items-center justify-center`}>
                        <ImageIcon size={48} className="text-primary/40" />
                      </div>
                    </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-semibold text-drone-dark">{item.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.category === 'imobiliario' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'eventos' ? 'bg-green-100 text-green-800' :
                      item.category === 'inspecoes' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                  
                  <p className="text-sm text-drone-gray mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-xs text-drone-gray mb-4">{item.created_at}</p>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit size={14} className="mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                </div>

                {/* Video indicator */}
                {item.video_url && (
                  <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    📹 Vídeo
                  </div>
                )}
                  </motion.div>
                </LoadingOverlay>
              ))}
            </div>
          )}

          {!isLoading && filteredPortfolio.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon size={64} className="text-gray-300 mx-auto mb-4" />
              <p className="text-drone-gray">Nenhum projeto encontrado.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Portfolio Form Modal */}
      <PortfolioForm
        project={editingProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </AdminLayout>
  );
}