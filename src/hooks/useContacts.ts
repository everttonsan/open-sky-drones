import { useState, useEffect, useCallback } from 'react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  status?: 'new' | 'contacted' | 'converted';
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/contacts');
      const result = await response.json();
      
      if (result.success) {
        setContacts(result.data);
      } else {
        throw new Error(result.message || 'Erro ao carregar contatos');
      }
    } catch (err) {
      console.error('Erro ao buscar contatos:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addContact = useCallback(async (contactData: Omit<Contact, 'id' | 'created_at' | 'status'>) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      
      if (result.success) {
        // Atualizar a lista local
        setContacts(prev => [result.data, ...prev]);
        return result.data;
      } else {
        throw new Error(result.message || 'Erro ao adicionar contato');
      }
    } catch (err) {
      console.error('Erro ao adicionar contato:', err);
      throw err;
    }
  }, []);

  const updateContactStatus = useCallback(async (contactId: string, status: Contact['status']) => {
    try {
      // Para o modo demo, atualizar apenas localmente
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId 
            ? { ...contact, status }
            : contact
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar status do contato:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    isLoading,
    error,
    addContact,
    updateContactStatus,
    refetch: fetchContacts,
  };
};