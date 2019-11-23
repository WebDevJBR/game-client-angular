import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Game } from '../models/Game';



@Injectable({
  providedIn: 'root'
})
export class GameService {

    // BehaviorSubject required as game component is a later subscriber.
    private game = new BehaviorSubject<any>(<any>{});
    private users = new BehaviorSubject<any>(<any>{});

    constructor() { }

    setGame(game: string) {
      this.game.next(game);
    }

    getGame(): Observable<any> {
      return this.game.asObservable();
    }
}