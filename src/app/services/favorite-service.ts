import { inject, Injectable } from '@angular/core';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  userService = inject(UserService);

  toggleFavorite(recipeId: string) {
    const current = this.userService.userFavorite();
    let next: string[];
    if (current.includes(recipeId)) {
      next = current.filter((id) => id !== recipeId);
    } else {
      next = [...current, recipeId];
    }

    this.userService.userFavorite.set(next);

    const user = this.userService.getUser();
    if (user) {
      user.favorites = next;
    }
  }

  isFavorite(recipeId: string): boolean {
    return this.userService.userFavorite().includes(recipeId);
  }

  getFavorites(): string[] {
    return this.userService.userFavorite();
  }
}
