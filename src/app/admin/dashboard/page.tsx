'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Images, 
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  Award
} from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card } from '@/components/ui';

const stats = [
  {
    name: 'Projetos Concluídos',
    value: '124',
    change: '+12%',
    changeType: 'increase',
    icon: Award,
    color: 'bg-blue-500',
  },
  {
    name: 'Novos Contatos',
    value: '8',
    change: '+4',
    changeType: 'increase',
    icon: Mail,
    color: 'bg-green-500',
  },
  {
    name: 'Portfólio Items',
    value: '32',
    change: '+2',
    changeType: 'increase',
    icon: Images,
    color: 'bg-purple-500',
  },
  {
    name: 'Taxa de Conversão',
    value: '12.5%',
    change: '+2.1%',
    changeType: 'increase',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
];

const recentContacts = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    message: 'Interessado em fotografia aérea para evento',
    date: '2024-01-15',
    status: 'new'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@construtora.com',
    phone: '(11) 88888-8888',
    message: 'Preciso de mapeamento para obra',
    date: '2024-01-14',
    status: 'contacted'
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    email: 'carlos@imobiliaria.com',
    phone: '(11) 77777-7777',
    message: 'Tour virtual para empreendimento',
    date: '2024-01-13',
    status: 'converted'
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Visão geral das atividades e estatísticas"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-body font-medium text-drone-gray-500 dark:text-drone-gray-400 mb-1">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-heading font-bold text-tech-black dark:text-white">
                      {stat.value}
                    </p>
                    <p className={`text-sm font-body ${
                      stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.change} vs mês anterior
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-lg text-tech-black dark:text-white">
                  Contatos Recentes
                </h3>
                <button className="text-primary hover:text-primary/80 font-body font-medium text-sm">
                  Ver todos
                </button>
              </div>
              
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <div className="w-10 h-10 bg-gradient-sky rounded-full flex items-center justify-center">
                      <Users size={18} className="text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-body font-medium text-tech-black dark:text-white">{contact.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          contact.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {contact.status === 'new' ? 'Novo' :
                           contact.status === 'contacted' ? 'Contatado' : 'Convertido'}
                        </span>
                      </div>
                      
                      <p className="text-sm font-body text-drone-gray-500 dark:text-drone-gray-400 mb-1">{contact.email}</p>
                      <p className="text-sm font-body text-drone-gray-500 dark:text-drone-gray-400 truncate">{contact.message}</p>
                      <p className="text-xs font-body text-drone-gray-400 dark:text-drone-gray-500 mt-1">{contact.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="font-heading font-semibold text-lg text-tech-black dark:text-white mb-6">
                Ações Rápidas
              </h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Images size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-tech-black dark:text-white">Adicionar ao Portfólio</p>
                    <p className="text-sm font-body text-drone-gray-500 dark:text-drone-gray-400">Criar novo item no portfólio</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-tech-black dark:text-white">Novo Depoimento</p>
                    <p className="text-sm font-body text-drone-gray-500 dark:text-drone-gray-400">Adicionar feedback de cliente</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-tech-black dark:text-white">Agendar Projeto</p>
                    <p className="text-sm font-body text-drone-gray-500 dark:text-drone-gray-400">Criar nova agenda de trabalho</p>
                  </div>
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}