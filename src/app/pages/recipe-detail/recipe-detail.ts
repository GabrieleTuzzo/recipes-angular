import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  private recipeService = inject(RecipeService);
  recipeId = this.route.snapshot.paramMap.get('id');
  recipe: Recipe | null = null;

  ngOnInit() {
    if (this.recipeId) {
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
    }
  }
}
