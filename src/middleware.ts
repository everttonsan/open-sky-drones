import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Proteger todas as rotas /admin exceto /admin/login
        if (req.nextUrl.pathname.startsWith('/admin')) {
          if (req.nextUrl.pathname === '/admin/login') {
            return true; // Permitir acesso à página de login
          }
          return !!token; // Exigir autenticação para outras rotas admin
        }
        return true; // Permitir acesso a outras rotas
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*']
};