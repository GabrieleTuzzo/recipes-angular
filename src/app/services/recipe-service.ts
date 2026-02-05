import { Injectable, signal } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { of, forkJoin, map, switchMap, Observable } from 'rxjs';
import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiBase = 'https://www.themealdb.com/api/json/v1/1';
  private useMockData = true; // Set to false when backend is back up

  recipes = signal<Recipe[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    this.loading.set(true);

    // Use mock data while backend is down
    if (this.useMockData) {
      setTimeout(() => {
        this.recipes.set(MOCK_RECIPES);
        this.loading.set(false);
      }, 500); // Simulate network delay
      return;
    }

    this.http
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
      thumbnail: meal.strMealThumb,
      instructions: meal.strInstructions,
      ingredients,
    };
  }
}
