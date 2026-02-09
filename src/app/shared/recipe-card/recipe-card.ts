import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite-service';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  recipe = input.required<Recipe>();
  router = inject(Router);
  favoriteService = inject(FavoriteService);

  navigateToRecipe() {
    this.router.navigate(['/recipes', this.recipe().id]);
  }
}
