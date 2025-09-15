# Configuração do Supabase

## 1. Criando as tabelas

Execute os seguintes comandos SQL no editor SQL do Supabase:

### Tabela services
```sql
CREATE TABLE services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Tabela portfolio
```sql
CREATE TABLE portfolio (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  video_url text,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Tabela testimonials
```sql
CREATE TABLE testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  client_photo text,
  testimonial text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Tabela site_settings
```sql
CREATE TABLE site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title text NOT NULL DEFAULT 'Capturando sua visão do céu',
  hero_subtitle text NOT NULL DEFAULT 'Serviços profissionais de drone para todas as suas necessidades',
  about_text text NOT NULL DEFAULT 'Open Sky Drones oferece serviços profissionais...',
  whatsapp_number text NOT NULL DEFAULT '5511999999999',
  social_links jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Tabela contact_forms
```sql
CREATE TABLE contact_forms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## 2. Configurando Storage (para upload de arquivos)

1. Acesse Storage no painel do Supabase
2. Crie um bucket chamado `uploads`
3. Configure as políticas de segurança conforme necessário

## 3. Dados iniciais

### Inserir configurações do site
```sql
INSERT INTO site_settings (hero_title, hero_subtitle, about_text, whatsapp_number, social_links) 
VALUES (
  'Capturando sua visão do céu',
  'Serviços profissionais de drone para todas as suas necessidades',
  'A Open Sky Drones é especializada em serviços profissionais de drone, oferecendo soluções inovadoras para captura aérea, mapeamento, inspeções industriais e muito mais.',
  '5511999999999',
  '{"instagram": "", "facebook": "", "linkedin": "", "youtube": ""}'::jsonb
);
```

### Inserir serviços de exemplo
```sql
INSERT INTO services (title, description, icon) VALUES
('Fotografia Aérea', 'Captura de imagens aéreas profissionais para eventos, imóveis e marketing', 'camera'),
('Mapeamento', 'Mapeamento topográfico e ortofotografias de precisão', 'map'),
('Inspeções', 'Inspeções técnicas em torres, telhados e estruturas', 'search'),
('Vídeo Aéreo', 'Produção de vídeos aéreos cinematográficos', 'video');
```