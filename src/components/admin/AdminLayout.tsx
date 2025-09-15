'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, subtitle, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Skip links para acessibilidade */}
      <a href="#admin-main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <a href="#admin-navigation" className="skip-link">
        Pular para navegação
      </a>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:translate-x-0 lg:static lg:inset-0 
        transition-transform duration-300 ease-in-out lg:transition-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} id="admin-navigation" />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <AdminHeader 
          title={title} 
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main
          id="admin-main-content"
          className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  );
};