'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Exo_2, Montserrat } from 'next/font/google';

const exo2 = Exo_2({ subsets: ['latin'], variable: '--font-heading' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-body' });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className={`${exo2.variable} ${montserrat.variable} font-body bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </SessionProvider>
  );
}