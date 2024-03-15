import { Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('@auth/pages/login/home.page').then((m) => m.HomePage),
    data: { isProtect: 30 },
    canActivate: [AuthGuard],
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@auth/pages/register/register.page').then((m) => m.RegisterPage),
    data: { isProtect: 30 },
    canActivate: [AuthGuard],
    title: 'Registrarme',
  },

  {
    path: 'notice',
    loadComponent: () =>
      import('./general/general-notice/general-notice.component').then(
        (m) => m.GeneralNoticeComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@notice/pages/notice-home/notice-home.page').then(
            (m) => m.NoticeHomePage
          ),
        data: { isProtect: 20 },
        canActivate: [AuthGuard],
        title: 'Noticias',
      },
      {
        path: 'create',
        loadComponent: () =>
          import('@notice/pages/notice-create/notice-create.page').then(
            (m) => m.NoticeCreatePage
          ),
        data: { isProtect: 20, roles: ['ADMIN'] },
        canActivate: [AuthGuard],
        title: 'Crear Noticia',
      },

      {
        path: 'detail/:id',
        loadComponent: () =>
          import('@notice/pages/notice-detaill/notice-detaill.page').then(
            (m) => m.NoticeDetaillPage
          ),
        data: { isProtect: 20 },
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('@notice/pages/notice-edit/notice-edit.page').then(
            (m) => m.NoticeEditPage
          ),
        data: { isProtect: 20, roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        loadComponent: () =>
          import('@category/pages/category-home/category-home.page').then(
            (m) => m.CategoryHomePage
          ),
        title: 'Categorias',
        data: { isProtect: 20, roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'category/edit/:id',
        loadComponent: () =>
          import('@category/pages/category-edit/category-edit.page').then(
            (m) => m.CategoryEditPage
          ),
        title: 'Categorías',
        data: { isProtect: 20, roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'category/create',
        loadComponent: () =>
          import('./category/pages/category-create/category-create.page').then(
            (m) => m.CategoryCreatePage
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
