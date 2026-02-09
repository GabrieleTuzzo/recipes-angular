import { Component, inject, input } from '@angular/core';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  recipeId = this.route.snapshot.paramMap.get('id');
  recipe: Recipe | null = null;

  ngOnInit() {
    if (this.recipeId) {
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
      if (!this.recipe) {
        console.error('Recipe not found for ID:', this.recipeId);
        this.router.navigate(['/recipes']);
      }
    }
  }
}
