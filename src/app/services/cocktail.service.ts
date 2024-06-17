import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Keyword } from '../enums/keyword';
import { Cocktail } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  favorite: Array<string> = this.getItem(Keyword.FAVORITE);

  constructor(private http: HttpClient) {}

  getcocktailList() {
    return this.http.get<Array<Cocktail>>('/cockails');
  }
  getCocktailDetail(id: string) {
    return this.http.get<Cocktail>(`/cockails/${id}`);
  }

  setItem(key: string, value: Array<string>) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): Array<string> {
    const item = localStorage.getItem(key) as string;
    return JSON.parse(item);
  }
}
