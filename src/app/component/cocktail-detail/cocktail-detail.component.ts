import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Keyword, MagicNumber } from '../../enums/keyword';
import { Cocktail } from '../../interfaces/common.interface';
import { CocktailService } from '../../services/cocktail.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrl: './cocktail-detail.component.scss',
})
export class CocktailDetailComponent implements OnInit {
  cocktail!: Cocktail;
  favorite: Array<string> = this.coctailService.getItem(Keyword.FAVORITE);
  id: string;

  constructor(
    private route: ActivatedRoute,
    private coctailService: CocktailService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = String(params.get('id'));
      this.getcocktailDetail(this.id);
    });
  }

  getcocktailDetail(id: string) {
    this.coctailService.getCocktailDetail(id).subscribe({
      next: (x) => {
        this.cocktail = x;
      },
      error: (err) => {
        alert(err);
      },
      complete: () => {
        setTimeout(() => {
          this.checkIsFavorite();
        }, MagicNumber.ZERO);
      },
    });
  }

  checkIsFavorite() {
    if (!this.favorite) {
      this.coctailService.setItem(Keyword.FAVORITE, []);
      this.favorite = this.coctailService.getItem(Keyword.FAVORITE);
    } else {
      if (this.favorite.length && this.favorite.includes(this.id)) {
        const star = document.getElementById(`star-${this.id}`) as HTMLElement;
        if (star) {
          star.classList.add('active');
        }
      }
    }
  }

  makeFavAndUnfav(id: string) {
    const star = document.getElementById(`star-${id}`) as HTMLElement;
    if (this.favorite.includes(id)) {
      this.favorite = this.favorite.filter((x) => x !== id);
      this.coctailService.setItem(Keyword.FAVORITE, this.favorite);
      star.classList.remove('active');
    } else {
      this.favorite.push(id);
      this.coctailService.setItem(Keyword.FAVORITE, this.favorite);
      star.classList.add('active');
    }
  }
}
