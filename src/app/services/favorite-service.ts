import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: string[] = [];

  toggleFavorite(recipeId: string) {
    if (this.isFavorite(recipeId)) {
      this.favorites = this.favorites.filter((id) => id !== recipeId);
    } else {
      this.favorites.push(recipeId);
    }
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.includes(recipeId);
  }

  getFavorites(): string[] {
    return this.favorites;
  }
}
