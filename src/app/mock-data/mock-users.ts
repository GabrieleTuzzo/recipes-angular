import { User } from '../models/user.model';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    favorites: [],
  },
  {
    id: 2,
    name: 'Normal User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    favorites: [],
  },
];
