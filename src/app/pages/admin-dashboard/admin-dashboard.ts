import { Component, inject, computed, ViewChild } from '@angular/core';
import { RecipeService } from '../../services/recipe-service';
import { EditRecipeModal } from '../../components/edit-recipe-modal/edit-recipe-modal';

@Component({
  selector: 'app-admin-dashboard',
  imports: [EditRecipeModal],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  recipeService = inject(RecipeService);
  recipesKeys = computed(() => {
    const recipes = this.recipeService.recipes();
    if (recipes.length === 0) return [];
    return Object.keys(recipes[0]);
  });

  @ViewChild(EditRecipeModal as any) editModal!: EditRecipeModal;

  openCreate() {
    this.editModal.loadForCreate();
  }

  openEdit(recipe: any) {
    this.editModal.loadForEdit(recipe);
  }
}
