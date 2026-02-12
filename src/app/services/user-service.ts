import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mock-data/mock-users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;
  userFavorite = signal<string[]>(this.user?.favorites || []);
  router = inject(Router);

  constructor() {
    // try to restore user from localStorage so navigation or reloads don't log out
    try {
      const raw = localStorage.getItem('app_user');
      if (raw) {
        const parsed: User = JSON.parse(raw);
        this.user = parsed;
        this.userFavorite.set(parsed.favorites || []);
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  login({ email, password }: { email: string; password: string }): boolean {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      this.user = found;
      this.userFavorite.set(found.favorites || []);
      try {
        localStorage.setItem('app_user', JSON.stringify(found));
      } catch (e) {}
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    this.userFavorite.set([]);
    try {
      localStorage.removeItem('app_user');
    } catch (e) {}
    this.router.navigate(['/']);
  }

  setFavorites(favorites: string[]) {
    this.userFavorite.set(favorites);
    if (this.user) {
      this.user.favorites = favorites;
      try {
        localStorage.setItem('app_user', JSON.stringify(this.user));
      } catch (e) {}
    }
  }

  getUser(): User | null {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
