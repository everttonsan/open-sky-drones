'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Settings,
  Images,
  MessageSquare,
  Mail,
  LogOut,
  Home,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Serviços', href: '/admin/services', icon: Settings },
  { name: 'Portfólio', href: '/admin/portfolio', icon: Images },
  { name: 'Depoimentos', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Contatos', href: '/admin/contacts', icon: Mail },
  { name: 'Configurações', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  onClose?: () => void;
  id?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose, id }) => {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <nav 
      id={id}
      className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col transition-colors duration-300"
      role="navigation"
      aria-label="Navegação administrativa"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/logo.jpeg" 
              alt="Open Sky Drones Logo" 
              className="w-10 h-10 object-contain rounded-lg dark:brightness-0 dark:invert"
            />
            <div>
              <h1 className="font-heading font-bold text-lg text-tech-black dark:text-white">
                Admin Panel
              </h1>
              <p className="text-xs text-drone-gray-500 dark:text-drone-gray-400">Open Sky Drones</p>
            </div>
          </div>
          
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} className="text-drone-gray-500 dark:text-drone-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 bg-white dark:bg-gray-800">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-sky text-white shadow-drone'
                      : 'text-drone-gray-500 dark:text-drone-gray-400 hover:text-tech-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-body font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-white dark:bg-gray-800">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center space-x-3 px-4 py-3 text-drone-gray-500 dark:text-drone-gray-400 hover:text-tech-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
        >
          <Home size={20} />
          <span className="font-body font-medium">Ver Site</span>
        </Link>
        
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-body font-medium">Sair</span>
        </button>
      </div>
    </nav>
  );
};