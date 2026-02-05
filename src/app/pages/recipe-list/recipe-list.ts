import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe-service';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  constructor(private recipeService: RecipeService) {
    effect(() => {
      console.log('Recipes updated:', this.recipeService.recipes());
    });
  }
}
