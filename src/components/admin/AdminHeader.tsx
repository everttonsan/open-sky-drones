'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Bell, User, Search, Menu } from 'lucide-react';
import { AdminThemeToggle } from './AdminThemeToggle';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, onMenuClick }) => {
  const { data: session } = useSession();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4 transition-colors duration-300" role="banner">
      <div className="flex items-center justify-between">
        {/* Mobile menu button and Title */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="touch-target interactive-element lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 smooth-transition focus-ring"
              aria-label="Abrir menu de navegação"
            >
              <Menu size={20} className="text-drone-gray-500 dark:text-drone-gray-400" />
            </button>
          )}
          
          {/* Title */}
          <div>
            <h1 className="font-heading font-bold text-xl lg:text-2xl text-tech-black dark:text-white">{title}</h1>
            {subtitle && (
              <p className="font-body text-drone-gray-500 dark:text-drone-gray-400 mt-1 text-sm hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search - Hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-drone-gray-500 dark:text-drone-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-tech-black dark:text-white rounded-lg focus-ring smooth-transition w-48 lg:w-64"
              aria-label="Campo de busca"
            />
          </div>

          {/* Search button for mobile */}
          <button 
            className="touch-target interactive-element md:hidden p-2 text-drone-gray-500 dark:text-drone-gray-400 hover:text-tech-black dark:hover:text-white smooth-transition focus-ring rounded-lg"
            aria-label="Abrir busca"
          >
            <Search size={20} />
          </button>

          {/* Theme Toggle */}
          <AdminThemeToggle />

          {/* Notifications */}
          <button 
            className="touch-target interactive-element relative p-2 text-drone-gray-500 dark:text-drone-gray-400 hover:text-tech-black dark:hover:text-white smooth-transition focus-ring rounded-lg"
            aria-label="Notificações (3 não lidas)"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shadow-drone">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3 pl-2 lg:pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-sky rounded-full flex items-center justify-center shadow-drone">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-body font-medium text-tech-black dark:text-white text-sm">
                {session?.user?.name || 'Administrador'}
              </p>
              <p className="font-body text-xs text-drone-gray-500 dark:text-drone-gray-400">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};