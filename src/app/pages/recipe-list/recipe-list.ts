import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe-service';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { Loader } from '../../shared/loader/loader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard, Loader, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  selectedCategories = signal<string[]>([]);
  searchTerm = signal<string>('');

  filteredRecipes = computed(() =>
    this.recipeService.filterRecipes(this.selectedCategories(), this.searchTerm()),
  );

  constructor(public recipeService: RecipeService) {}

  toggleCategory(category: string) {
    const current = this.selectedCategories();
    if (current.includes(category)) {
      this.selectedCategories.set(current.filter((c) => c !== category));
    } else {
      this.selectedCategories.set([...current, category]);
    }
  }
}
