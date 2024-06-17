import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CocktailListComponent } from '../component/cocktail-list/cocktail-list.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter/filter.pipe';
import { RouterModule } from '@angular/router';
import { CocktailDetailComponent } from '../component/cocktail-detail/cocktail-detail.component';

@NgModule({
  declarations: [CocktailListComponent, CocktailDetailComponent, FilterPipe],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
})
export class MainModule {}
