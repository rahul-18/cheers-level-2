import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Cocktail } from '../../interfaces/common.interface';
import { CocktailService } from '../../services/cocktail.service';
import { Keyword, MagicNumber } from './../../enums/keyword';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss',
})
export class CocktailListComponent implements OnInit, AfterViewInit {
  cocktails: Array<Cocktail>;
  searchedText: string;
  favorite: Array<string> = this.coctailService.getItem(Keyword.FAVORITE);

  constructor(private coctailService: CocktailService) {}

  ngOnInit(): void {
    this.getCocktails();
  }

  getCocktails() {
    this.coctailService.getcocktailList().subscribe({
      next: (x) => {
        this.cocktails = x;
        for (let ele of this.cocktails) {
          if (this.favorite && this.favorite.length) {
            if (this.favorite.includes(ele.id)) {
              ele.isFavorite = true;
            } else {
              ele.isFavorite = false;
            }
          }
        }
      },
      error: (err) => {
        alert(err);
      },
      complete: () => {},
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setLocalSCtorage();
    }, MagicNumber.FIVE_HUNDRED);
  }

  setLocalSCtorage() {
    if (!this.favorite) {
      this.coctailService.setItem(Keyword.FAVORITE, []);
      this.favorite = this.coctailService.getItem(Keyword.FAVORITE);
    } else {
      if (this.favorite.length) {
        for (let id of this.favorite) {
          for (let x of this.cocktails) {
            if (x.id === id) {
              x.isFavorite = true;
            }
          }
        }
      }
    }
  }

  makeFavAndUnfav(id: string) {
    if (this.favorite.length && this.favorite.includes(id)) {
      this.favorite = this.favorite.filter((x) => x !== id);
      this.coctailService.setItem(Keyword.FAVORITE, this.favorite);
      for (let x of this.cocktails) {
        if (x.id === id) {
          x.isFavorite = false;
        }
      }
    } else {
      this.favorite.push(id);
      this.coctailService.setItem(Keyword.FAVORITE, this.favorite);
      for (let x of this.cocktails) {
        if (x.id === id) {
          x.isFavorite = true;
        }
      }
    }
  }
}
