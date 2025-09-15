'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md w-full"
          >
            <Card className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-red-600" />
              </div>
              
              <h3 className="font-heading font-semibold text-xl text-drone-dark mb-3">
                Oops! Algo deu errado
              </h3>
              
              <p className="font-body text-drone-gray mb-6">
                Encontramos um erro inesperado. Por favor, tente novamente ou entre em contato 
                conosco se o problema persistir.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-left">
                  <p className="text-sm font-mono text-red-800 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button onClick={this.handleReset} className="w-full">
                  <RefreshCw size={16} className="mr-2" />
                  Tentar Novamente
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()} 
                  className="w-full"
                >
                  Recarregar Página
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface ErrorAlertProps {
  error: string | null;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  error, 
  onDismiss, 
  className = '' 
}) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start">
        <AlertTriangle size={20} className="text-red-600 mr-3 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-600 hover:text-red-800 ml-2 flex-shrink-0"
            aria-label="Fechar erro"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

interface SuccessAlertProps {
  message: string | null;
  onDismiss?: () => void;
  className?: string;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({ 
  message, 
  onDismiss, 
  className = '' 
}) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start">
        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
          <span className="text-white text-xs">✓</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-green-800">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-green-600 hover:text-green-800 ml-2 flex-shrink-0"
            aria-label="Fechar mensagem"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};