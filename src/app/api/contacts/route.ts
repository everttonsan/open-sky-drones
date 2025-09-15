import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { z } from 'zod';

// Schema de validação
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const validatedData = contactSchema.parse(body);

    // Tentar salvar no Supabase (se configurado)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl !== 'https://demo.supabase.co') {
      const { data, error } = await supabase
        .from('contact_forms')
        .insert([validatedData])
        .select()
        .single();

      if (error) {
        console.error('Erro no Supabase:', error);
        throw new Error('Erro ao salvar no banco de dados');
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Contato salvo com sucesso!',
        data 
      });
    } else {
      // Modo demo - salvar em localStorage ou mock
      console.log('Contato recebido (modo demo):', validatedData);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json({ 
        success: true, 
        message: 'Contato enviado com sucesso! (modo demo)',
        data: {
          id: Date.now().toString(),
          ...validatedData,
          created_at: new Date().toISOString(),
          status: 'new'
        }
      });
    }
  } catch (error) {
    console.error('Erro na API de contatos:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dados inválidos',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (supabaseUrl && supabaseUrl !== 'https://demo.supabase.co') {
      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar contatos:', error);
        throw new Error('Erro ao buscar contatos');
      }

      return NextResponse.json({ success: true, data: data || [] });
    } else {
      // Modo demo - dados estáticos
      const mockContacts = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@empresa.com',
          phone: '(11) 99999-9999',
          message: 'Gostaria de solicitar um orçamento para fotografia aérea de um evento corporativo.',
          created_at: new Date().toISOString(),
          status: 'new'
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@construtora.com',
          phone: '(11) 88888-8888',
          message: 'Preciso de mapeamento topográfico para uma obra de construção civil.',
          created_at: new Date().toISOString(),
          status: 'contacted'
        }
      ];

      return NextResponse.json({ success: true, data: mockContacts });
    }
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}