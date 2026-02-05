import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { RecipeService } from './services/recipe-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
})
export class App {
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.fetchRecipes();
  }
}
