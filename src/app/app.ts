import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { RecipeService } from './services/recipe-service';
import { HeaderComponent } from './components/header-component/header-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
})
export class App {
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.fetchRecipes();
  }
}
