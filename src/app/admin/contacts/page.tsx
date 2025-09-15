'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, Calendar, Eye, Archive } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, Button, TableSkeleton, LoadingOverlay } from '@/components/ui';
import { useContacts } from '@/hooks/useContacts';

const mockContacts = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    message: 'Gostaria de solicitar um orçamento para fotografia aérea de um evento corporativo que acontecerá no próximo mês.',
    created_at: '2024-01-15 14:30',
    status: 'new'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@construtora.com',
    phone: '(11) 88888-8888',
    message: 'Preciso de mapeamento topográfico para uma obra de construção civil. Podem me enviar informações?',
    created_at: '2024-01-14 09:15',
    status: 'contacted'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@imobiliaria.com',
    phone: '(11) 77777-7777',
    message: 'Interessado em tour virtual aéreo para empreendimento imobiliário.',
    created_at: '2024-01-13 16:45',
    status: 'converted'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@eventos.com',
    phone: null,
    message: 'Olá! Gostaria de saber sobre cobertura aérea para casamento.',
    created_at: '2024-01-12 11:20',
    status: 'contacted'
  }
];

export default function ContactsAdmin() {
  const { contacts, isLoading, error, updateContactStatus } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'converted': return 'Convertido';
      default: return 'Desconhecido';
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateContactStatus(id, newStatus as any);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const statusStats = {
    new: contacts.filter(c => c.status === 'new').length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    converted: contacts.filter(c => c.status === 'converted').length,
    total: contacts.length
  };

  return (
    <AdminLayout 
      title="Gerenciar Contatos" 
      subtitle="Acompanhe e responda às solicitações dos clientes"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-drone-gray" size={18} />
              <input
                type="text"
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 bg-white"
            >
              <option value="all">Todos os Status</option>
              <option value="new">Novos</option>
              <option value="contacted">Contatados</option>
              <option value="converted">Convertidos</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Total</p>
                <p className="text-2xl font-bold text-drone-dark">{statusStats.total}</p>
              </div>
              <Mail size={20} className="text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Novos</p>
                <p className="text-2xl font-bold text-blue-600">{statusStats.new}</p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Contatados</p>
                <p className="text-2xl font-bold text-yellow-600">{statusStats.contacted}</p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-drone-gray mb-1">Convertidos</p>
                <p className="text-2xl font-bold text-green-600">{statusStats.converted}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </Card>
        </div>

        {/* Contacts List */}
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-lg text-drone-dark mb-6">
            Contatos ({filteredContacts.length})
          </h3>

          {isLoading ? (
            <TableSkeleton rows={5} columns={4} />
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 gap-4"
              >
                <div className="flex items-start space-x-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-sky rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-heading font-semibold text-drone-dark">{contact.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status || 'new')}`}>
                        {getStatusLabel(contact.status || 'new')}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4 text-sm text-drone-gray mb-2">
                      <div className="flex items-center">
                        <Mail size={14} className="mr-1" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" />
                          {contact.phone}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {contact.created_at}
                      </div>
                    </div>
                    
                    <p className="text-drone-gray text-sm line-clamp-2">{contact.message}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-2 ml-0 sm:ml-4 mt-4 sm:mt-0 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedContact(contact)}
                    className="w-full sm:w-auto"
                  >
                    <Eye size={14} className="mr-1" />
                    Ver
                  </Button>
                  
                  <select
                    value={contact.status || 'new'}
                    onChange={(e) => updateStatus(contact.id, e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary/20 focus:border-primary w-full sm:w-auto min-h-[36px]"
                  >
                    <option value="new">Novo</option>
                    <option value="contacted">Contatado</option>
                    <option value="converted">Convertido</option>
                  </select>
                </div>
              </motion.div>
              ))}
            </div>
          )}

          {!isLoading && filteredContacts.length === 0 && (
            <div className="text-center py-8">
              <Mail size={64} className="text-gray-300 mx-auto mb-4" />
              <p className="text-drone-gray">Nenhum contato encontrado.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-heading font-semibold text-xl text-drone-dark">
                Detalhes do Contato
              </h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-drone-gray hover:text-drone-dark"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-drone-gray mb-1">Nome:</label>
                <p className="text-drone-dark">{selectedContact.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-drone-gray mb-1">Email:</label>
                <p className="text-drone-dark">{selectedContact.email}</p>
              </div>
              
              {selectedContact.phone && (
                <div>
                  <label className="block text-sm font-medium text-drone-gray mb-1">Telefone:</label>
                  <p className="text-drone-dark">{selectedContact.phone}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-drone-gray mb-1">Data:</label>
                <p className="text-drone-dark">{selectedContact.created_at}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-drone-gray mb-1">Mensagem:</label>
                <p className="text-drone-dark leading-relaxed">{selectedContact.message}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button onClick={() => setSelectedContact(null)} variant="outline">
                Fechar
              </Button>
              <Button>
                Responder por Email
              </Button>
            </div>
          </Card>
        </div>
      )}
    </AdminLayout>
  );
}