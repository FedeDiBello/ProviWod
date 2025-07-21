// types/express/index.d.ts

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {}; // Esto es necesario para que TypeScript lo tome como módulo