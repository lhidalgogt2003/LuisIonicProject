import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [
      AuthGuard
    ],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'student-list',
    loadChildren: () => import('./students/student-list/student-list.module').then(m => m.StudentListPageModule)
  },
  {
    path: 'beer-list',
    loadChildren: () => import('./beers/beer-list/beer-list.module').then(m => m.BeerListPageModule)
  },
  {
    path: 'student-create',
    loadChildren: () => import('./students/student-create/student-create.module').then(m => m.StudentCreatePageModule)
  },
  {
    path: 'student-edit/:id',
    loadChildren: () => import('./students/student-edit/student-edit.module').then(m => m.StudentEditPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
