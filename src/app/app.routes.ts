import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailDetailComponent } from './component/cocktail-detail/cocktail-detail.component';
import { CocktailListComponent } from './component/cocktail-list/cocktail-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CocktailListComponent,
  },
  {
    path: 'cocktail-list',
    component: CocktailListComponent,
  },
  {
    path: 'cocktail-detail/:id',
    component: CocktailDetailComponent,
  },
];
