import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-edit-recipe-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-recipe-modal.html',
  styleUrl: './edit-recipe-modal.css',
})
export class EditRecipeModal {
  private recipeService = inject(RecipeService);
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    category: new FormControl(''),
    area: new FormControl(''),
    thumbnail: new FormControl(''),
    instructions: new FormControl(''),
    ingredients: new FormArray([]),
  });

  isEdit = false;
  isOpen = signal(false);

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  loadForEdit(recipe: Recipe) {
    this.isEdit = true;
    this.form.patchValue({
      id: recipe.id,
      title: recipe.title,
      category: recipe.category,
      area: recipe.area,
      thumbnail: recipe.thumbnail,
      instructions: recipe.instructions,
    });
    this.ingredients.clear();
    (recipe.ingredients || []).forEach((ing) =>
      this.ingredients.push(
        new FormGroup({
          ingredient: new FormControl(ing.ingredient),
          measure: new FormControl(ing.measure),
        }),
      ),
    );
    this.open();
  }

  loadForCreate() {
    this.isEdit = false;
    this.form.reset();
    this.ingredients.clear();
    this.open();
  }

  addIngredient() {
    this.ingredients.push(
      new FormGroup({ ingredient: new FormControl(''), measure: new FormControl('') }),
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  save() {
    if (this.form.invalid) return;
    const value = this.form.value as Recipe;
    if (this.isEdit) {
      this.recipeService.editRecipe(value);
    } else {
      this.recipeService.addRecipe(value);
    }
    this.loadForCreate();
    this.close();
  }

  cancel() {
    this.loadForCreate();
    this.close();
  }
}
