export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  favorites?: string[];
  role: 'admin' | 'user';
}
