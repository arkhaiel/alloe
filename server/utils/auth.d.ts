import type { dbUser } from './drizzle';

declare module '#auth-utils' {
  interface User extends dbUser {}

  interface UserSession {
    // Ajoute ici des champs spécifiques à la session si besoin
  }

  interface SecureSessionData {
    // Ajoute ici des données sécurisées si besoin
  }
}

export {};
