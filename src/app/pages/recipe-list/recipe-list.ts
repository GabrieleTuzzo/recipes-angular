import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe-service';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  constructor(public recipeService: RecipeService) {
    effect(() => {
      console.log('Recipes updated:', this.recipeService.recipes());
    });
  }
}
