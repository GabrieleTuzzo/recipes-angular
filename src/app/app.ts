import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeService } from './services/recipe-service';
import { HeaderComponent } from './components/header-component/header-component';
import { LoginModalComponent } from './components/login-modal-component/login-modal-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoginModalComponent],
  templateUrl: './app.html',
})
export class App {
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.fetchRecipes();
  }
}
