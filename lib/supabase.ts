import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para o banco de dados
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image_url?: string
  created_at: string
}

export interface Portfolio {
  id: string
  title: string
  description: string
  image_url: string
  video_url?: string
  category: string
  created_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_photo?: string
  testimonial: string
  rating: number
  created_at: string
}

export interface SiteSettings {
  id: string
  hero_title: string
  hero_subtitle: string
  about_text: string
  whatsapp_number: string
  social_links: {
    instagram?: string
    facebook?: string
    linkedin?: string
    youtube?: string
  }
}

export interface ContactForm {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  created_at: string
}