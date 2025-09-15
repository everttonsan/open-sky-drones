'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, MessageSquare, Palette, Shield } from 'lucide-react';
import { AdminLayout } from '@/components/admin';
import { Card, Button } from '@/components/ui';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    // Site Settings
    hero_title: 'Capturando sua visão do céu',
    hero_subtitle: 'Serviços profissionais de drone para todas as suas necessidades',
    about_text: 'A Open Sky Drones é especializada em serviços profissionais de drone, oferecendo soluções inovadoras para captura aérea, mapeamento, inspeções industriais e muito mais.',
    whatsapp_number: '5511999999999',
    
    // Social Links
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    
    // SEO Settings
    meta_description: 'Serviços profissionais de drone para captura aérea, mapeamento, inspeções e muito mais. Open Sky Drones - sua perspectiva do céu.',
    meta_keywords: 'drone, fotografia aérea, mapeamento, inspeção, video aéreo, open sky drones',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Aqui seria a integração com Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular request
      
      setSaveMessage('Configurações salvas com sucesso!');
    } catch (error) {
      setSaveMessage('Erro ao salvar configurações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout 
      title="Configurações" 
      subtitle="Gerencie as configurações gerais do site"
    >
      <div className="space-y-6">
        {/* Site Content Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Globe size={24} className="text-primary" />
            <h3 className="font-heading font-semibold text-lg text-drone-dark">
              Conteúdo do Site
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Título Principal (Hero)
              </label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => handleInputChange('hero_title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="Título principal da página inicial"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Subtítulo (Hero)
              </label>
              <input
                type="text"
                value={settings.hero_subtitle}
                onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="Subtítulo da página inicial"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Texto Sobre a Empresa
              </label>
              <textarea
                rows={4}
                value={settings.about_text}
                onChange={(e) => handleInputChange('about_text', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                placeholder="Descrição da empresa para a seção Sobre"
              />
            </div>
          </div>
        </Card>

        {/* Contact Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <MessageSquare size={24} className="text-primary" />
            <h3 className="font-heading font-semibold text-lg text-drone-dark">
              Contato & WhatsApp
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Número WhatsApp
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => handleInputChange('whatsapp_number', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="5511999999999"
              />
              <p className="text-xs text-drone-gray mt-1">
                Formato: Código do país + DDD + número (sem espaços ou símbolos)
              </p>
            </div>
          </div>
        </Card>

        {/* Social Media Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Palette size={24} className="text-primary" />
            <h3 className="font-heading font-semibold text-lg text-drone-dark">
              Redes Sociais
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="https://instagram.com/opensydrones"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="https://facebook.com/opensydrones"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={settings.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="https://linkedin.com/company/opensydrones"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                YouTube
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => handleInputChange('youtube', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="https://youtube.com/@opensydrones"
              />
            </div>
          </div>
        </Card>

        {/* SEO Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield size={24} className="text-primary" />
            <h3 className="font-heading font-semibold text-lg text-drone-dark">
              SEO & Meta Tags
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.meta_description}
                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                placeholder="Descrição que aparece nos resultados de busca (max 160 caracteres)"
              />
              <p className="text-xs text-drone-gray mt-1">
                {settings.meta_description.length}/160 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-drone-gray mb-2">
                Palavras-chave (separadas por vírgula)
              </label>
              <input
                type="text"
                value={settings.meta_keywords}
                onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                placeholder="drone, fotografia aérea, mapeamento..."
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            loading={isSaving}
            size="lg"
          >
            <Save size={20} className="mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              saveMessage.includes('sucesso') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {saveMessage}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
}