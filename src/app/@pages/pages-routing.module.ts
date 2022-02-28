import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)
      },
      {
        path: 'movies/add',
        loadChildren: () => import('./movie-add/movie-add.module').then(m => m.MovieAddModule)
      },
      {
        path: 'movies/:id',
        loadChildren: () => import('./movie-details/movie-details.module').then(m => m.MovieDetailsModule)
      },
      {
        path: 'actors',
        loadChildren: () => import('./actors/actors.module').then(m => m.ActorsModule)
      },
      {
        path: 'companies',
        loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
