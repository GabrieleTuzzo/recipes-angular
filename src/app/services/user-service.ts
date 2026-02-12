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

  login({ email, password }: { email: string; password: string }): boolean {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      this.user = found;
      this.userFavorite.set(found.favorites || []);
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    this.userFavorite.set([]);
    this.router.navigate(['/']);
  }

  getUser(): User | null {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
