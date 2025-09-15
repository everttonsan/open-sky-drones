'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (session) {
      // Se o usuário está logado, redirecionar para dashboard
      router.replace('/admin/dashboard');
    } else {
      // Se não está logado, redirecionar para login
      router.replace('/admin/login');
    }
  }, [session, status, router]);

  // Página de loading enquanto verifica a sessão
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light/20 to-primary/10 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary mx-auto mb-4" />
        <p className="text-drone-gray font-medium">Carregando área administrativa...</p>
      </div>
    </div>
  );
}