export interface User {
  id: string;
  name: string;
  password: string;
  favorites: string[];
  role: 'admin' | 'user';
}
