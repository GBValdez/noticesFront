import { Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@auth/pages/login/home.page').then((m) => m.HomePage),
    data: { isProtect: 30 },
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@auth/pages/register/register.page').then((m) => m.RegisterPage),
    data: { isProtect: 30 },
    canActivate: [AuthGuard],
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },,

  {
    path: 'home',
    loadComponent: () =>
      import('@notice/pages/notice-home/notice-home.page').then(
        (m) => m.NoticeHomePage
      ),
    data: { isProtect: 20 },
    canActivate: [AuthGuard],
  },
  {
    path: 'notice-create',
    loadComponent: () =>
      import('@notice/pages/notice-create/notice-create.page').then(
        (m) => m.NoticeCreatePage
      ),
    data: { isProtect: 20, roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'category-home',
    loadComponent: () =>
      import('@category/category-home/category-home.page').then(
        (m) => m.CategoryHomePage
      ),
  },
];
