import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../services/favorite-service';
import { RecipeService } from '../../services/recipe-service';
import { Loader } from '../../shared/loader/loader';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';

@Component({
  selector: 'app-favorites',
  imports: [Loader, RecipeCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  favoriteService = inject(FavoriteService);
  recipeService = inject(RecipeService);

  getFavoriteRecipes() {
    const favoriteIds = this.favoriteService.getFavorites();
    return this.recipeService.recipes().filter((recipe) => favoriteIds.includes(recipe.id));
  }
}
