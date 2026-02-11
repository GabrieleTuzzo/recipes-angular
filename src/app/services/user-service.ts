import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mock-data/mock-users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | null = null;
  router = inject(Router);

  login({ email, password }: { email: string; password: string }): boolean {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      this.user = found;
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    this.router.navigate(['/']);
  }

  getUser(): User | null {
    return this.user;
  }
}
