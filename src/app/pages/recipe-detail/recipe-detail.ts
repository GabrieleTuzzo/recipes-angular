import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  recipeId = input.required<string>();

  recipe = computed(() => {
    const id = this.recipeId();
    if (!id) {
      console.error('No recipe ID provided in route parameters');
      this.router.navigate(['/recipes']);
      return null;
    }

    const found = this.recipeService.getRecipeById(id);
    if (!found) {
      console.error('Recipe not found for ID:', id);
      this.router.navigate(['/recipes']);
      return null;
    }
    return found;
  });
}
