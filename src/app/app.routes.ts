import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { RecipeList } from './pages/recipe-list/recipe-list';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { Favorites } from './pages/favorites/favorites';
import { User } from './pages/user/user';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { inject } from '@angular/core';
import { UserService } from './services/user-service';

const authGuard: CanMatchFn = (routes, segments) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedIn()) {
    return true;
  }
  return new RedirectCommand(
    router.createUrlTree(['/recipes'], {
      queryParams: { login: 'true' },
    }),
  );
};

const adminGuard: CanMatchFn = (routes, segments) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const user = userService.getUser();

  if (user?.role === 'admin') {
    return true;
  }

  return new RedirectCommand(
    router.createUrlTree(['/recipes'], {
      queryParams: { login: 'true' },
    }),
  );
};

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
    path: 'recipes/:recipeId',
    component: RecipeDetail,
  },
  {
    path: 'auth',
    canMatch: [authGuard],
    children: [
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
        canMatch: [adminGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'recipes',
  },
];
