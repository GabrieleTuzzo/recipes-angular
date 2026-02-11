import { Routes } from '@angular/router';
import { RecipeList } from './pages/recipe-list/recipe-list';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { Favorites } from './pages/favorites/favorites';
import { User } from './pages/user/user';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipeList,
  },
  {
    path: 'recipes/:id',
    component: RecipeDetail,
  },
  {
    path: 'favorites',
    component: Favorites,
  },
  {
    path: 'user',
    component: User,
  },
  {
    path: 'admin',
    component: AdminDashboard,
  },
];
