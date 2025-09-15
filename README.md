# 🚁 Open Sky Drones - Landing Page + Admin Panel

Uma landing page moderna e profissional para empresa de serviços de drone com área administrativa completa, construída com Next.js 14, TypeScript, Tailwind CSS e Supabase.

## ✨ Características

### 🎨 Landing Page Pública
- **Design Moderno**: Interface clean com glassmorphism e gradientes
- **Responsivo**: Adaptado para mobile, tablet e desktop
- **Animações Suaves**: Powered by Framer Motion
- **SEO Otimizado**: Meta tags, sitemap, robots.txt
- **Performance**: Otimizada com Next.js 14 + Turbopack

### 🏢 Área Administrativa
- **Dashboard Completo**: Estatísticas e visão geral
- **Gerenciamento de Conteúdo**: CRUD para serviços, portfólio, depoimentos
- **Upload de Arquivos**: Integrado com Supabase Storage
- **Autenticação Segura**: NextAuth.js + Supabase Auth
- **Interface Intuitiva**: Design system consistente

### 🚀 Tecnologias Utilizadas
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animações**: Framer Motion
- **Backend**: Supabase (Database + Auth + Storage)
- **Autenticação**: NextAuth.js
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Deploy**: Vercel (recomendado)

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/open-sky-drones.git
cd open-sky-drones
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configuração do Supabase

#### 3.1. Crie um projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e ANON KEY

#### 3.2. Execute o SQL para criar as tabelas
Copie e execute o conteúdo do arquivo `docs/SUPABASE_SETUP.md` no editor SQL do Supabase.

#### 3.3. Configure Storage
1. Acesse Storage no painel do Supabase
2. Crie um bucket chamado `uploads`
3. Configure as políticas conforme necessário

### 4. Variáveis de Ambiente
Copie o arquivo `.env.local.example` para `.env.local` e configure:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_aleatoria

# Admin (opcional)
ADMIN_EMAIL=admin@opensydrones.com
ADMIN_PASSWORD=sua_senha_segura
```

### 5. Execute o projeto
```bash
npm run dev
```

Acesse:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Área administrativa
│   ├── api/               # API routes
│   └── globals.css        # Estilos globais
├── components/
│   ├── ui/                # Componentes base
│   ├── layout/            # Header, Footer
│   ├── sections/          # Seções da landing page
│   ├── forms/             # Formulários
│   └── admin/             # Componentes administrativos
├── lib/                   # Configurações (Supabase, etc)
├── hooks/                 # Custom hooks
├── utils/                 # Utilitários
└── types/                 # Tipos TypeScript
```

## 🎨 Identidade Visual

### Cores
- **Azul Céu**: `#3BB7F0` (primária)
- **Azul Claro**: `#A8E6FF` (fundos suaves)
- **Preto Técnico**: `#1E1E1E` (textos)
- **Cinza Drone**: `#BFC5CA` (neutros)

### Fontes
- **Títulos**: Exo 2 (400, 600, 700, 800)
- **Textos**: Montserrat (400, 500, 600)

## 🔧 Funcionalidades Implementadas

### Landing Page
- [x] Hero Section com CTAs
- [x] Seção de Serviços
- [x] Seção Sobre
- [x] Portfólio com filtros
- [x] Depoimentos (carrossel)
- [x] Formulário de Contato
- [x] Botão flutuante WhatsApp
- [x] Header responsivo
- [x] Footer completo

### Área Administrativa
- [x] Sistema de login
- [x] Dashboard com estatísticas
- [x] Gerenciamento de serviços
- [x] Gerenciamento de portfólio
- [x] Gerenciamento de depoimentos
- [x] Visualização de contatos
- [x] Configurações do site
- [x] Upload de arquivos

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Configure build command como `npm run build`
- **Railway**: Adicione arquivo `railway.toml`
- **DigitalOcean**: Use App Platform

## 🔒 Segurança

- Autenticação protegida com NextAuth.js
- Middleware para proteção de rotas administrativas
- Validação de formulários com Zod
- Sanitização de dados
- HTTPS obrigatório em produção

## 🎯 SEO e Performance

- Meta tags otimizadas
- Open Graph configurado
- Sitemap.xml automático
- Images otimizadas
- Lazy loading
- Core Web Vitals otimizados

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os issues no GitHub
3. Entre em contato via email

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Créditos

- Design inspirado em tendências modernas de 2024
- Ícones por [Lucide](https://lucide.dev)
- Fontes por [Google Fonts](https://fonts.google.com)
- Animações por [Framer Motion](https://framer.com/motion)

---

**Open Sky Drones** - Capturando sua visão do céu 🚁✨
