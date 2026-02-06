import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe-service';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { Loader } from '../../shared/loader/loader';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard, Loader],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  categories = computed(() => this.recipeService.recipes().map((r) => r.category));

  constructor(public recipeService: RecipeService) {}
}
