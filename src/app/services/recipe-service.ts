import { Injectable, signal } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { of, forkJoin, map, switchMap, Observable, Subscription } from 'rxjs';
import { MOCK_RECIPES } from '../mock-data/mock-recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiBase = 'https://www.themealdb.com/api/json/v1/1';
  private useMockData = false;
  private subscription: Subscription | null = null;
  private timeoutId: number | null = null;

  recipes = signal<Recipe[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    this.cleanup();

    this.loading.set(true);

    if (this.useMockData) {
      this.timeoutId = window.setTimeout(() => {
        this.recipes.set(MOCK_RECIPES);
        this.loading.set(false);
      }, 500);
      return;
    }

    this.subscription = this.http
      .get<any>(`${this.apiBase}/filter.php?a=Italian`)
      .pipe(
        switchMap((res) => {
          if (!res.meals) return of([] as Recipe[]);

          const detailCalls = res.meals.map((meal: any) =>
            this.http
              .get<any>(`${this.apiBase}/lookup.php?i=${meal.idMeal}`)
              .pipe(map((detail) => this.mapMeal(detail.meals[0]))),
          );

          return forkJoin(detailCalls) as Observable<Recipe[]>;
        }),
      )
      .subscribe({
        next: (r: Recipe[]) => {
          this.recipes.set(r);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load Italian recipes');
          this.loading.set(false);
        },
      });
  }

  getRecipeById(id: string): Recipe | null {
    return this.recipes().find((r) => r.id === id) || null;
  }

  private cleanup() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private mapMeal(meal: any): Recipe {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim() !== '') {
        ingredients.push({
          ingredient: ing,
          measure: meas?.trim() || '',
        });
      }
    }

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      thumbnail: `${meal.strMealThumb}`,
      instructions: meal.strInstructions,
      ingredients,
    };
  }

  addRecipe(newRecipe: Recipe) {
    newRecipe.id = Date.now().toString();
    this.recipes.set([...this.recipes(), newRecipe]);
  }

  editRecipe(updated: Recipe) {
    this.recipes.set(
      this.recipes().map((recipe) =>
        recipe.id === updated.id ? { ...recipe, ...updated } : recipe,
      ),
    );
  }

  deleteRecipe(id: string) {
    this.recipes.set(this.recipes().filter((r) => r.id !== id));
  }

  getCategories() {
    let categories = new Set<string>();
    this.recipes().forEach((r) => categories.add(r.category));
    return categories;
  }

  filterRecipes(categories: string[], searchTerm: string) {
    return this.recipes().filter((recipe) => {
      const matchesCategory = categories.length === 0 || categories.includes(recipe.category);
      const matchesSearch =
        searchTerm === '' || recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
