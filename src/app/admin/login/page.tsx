'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button, Card, Container } from '@/components/ui';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciais inválidas. Tente novamente.');
      } else {
        // Verificar se a sessão foi criada
        const session = await getSession();
        if (session) {
          router.push('/admin/dashboard');
        }
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light/20 to-primary/10 flex items-center justify-center p-4">
      <Container size="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-md mx-auto p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img 
                  src="/images/logo.jpeg" 
                  alt="Open Sky Drones Logo" 
                  className="w-16 h-16 object-contain rounded-2xl"
                />
              </div>
              
              <h1 className="font-heading font-bold text-2xl text-drone-dark mb-2">
                Área Administrativa
              </h1>
              
              <p className="font-body text-drone-gray">
                Faça login para acessar o painel administrativo
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block font-body font-medium text-drone-dark mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-drone-gray/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                  placeholder="admin@opensydrones.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-body font-medium text-drone-dark mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 border border-drone-gray/30 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-drone-gray hover:text-drone-dark transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                <LogIn size={20} className="mr-2" />
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="font-body text-sm text-drone-gray">
                Problemas para acessar?{' '}
                <button className="text-primary hover:underline font-medium">
                  Entre em contato
                </button>
              </p>
            </div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}