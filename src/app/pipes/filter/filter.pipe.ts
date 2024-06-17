import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../../interfaces/common.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(cocktails: Array<Cocktail>, searchText: string): Array<Cocktail> {
    if (!cocktails) {
      return [];
    }
    if (!searchText) {
      return cocktails;
    }
    searchText = searchText.toLowerCase();

    return cocktails.filter((x) => {
      return x.name.toLowerCase().includes(searchText);
    });
  }
}
