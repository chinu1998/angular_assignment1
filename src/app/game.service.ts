import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://spa.api.logicloop.io/api/games?pagination[page]=1&pagination[pageSize]=110 ';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(delay(2000)); // 2-second delay
  }
}
interface GameAttributes {
  name: string;
  genre: string;
  rating: number;
}

interface Game {
  id: number;
  attributes: GameAttributes;
}
