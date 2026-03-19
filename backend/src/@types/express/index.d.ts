export {}; // 🔥 importante para transformar em module

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: string;
        tipo: string;
      };
    }
  }
}