import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GameService } from '../core/services/game.service';
import { WebSocketService } from '../core/services/web-socket.service';
import { Game } from '../core/models/Game';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private gameSubscription: Subscription;
  private usersSubscription: Subscription;
  public game: Game = <Game>{};
  public users: any[]= [];
  public buzzedUser: string = '';

  constructor(private webSocketService: WebSocketService, private gameService: GameService) { }

  ngOnInit() {

    this.gameSubscription = this.gameService.getGame().subscribe((game) => {
        if (game) {
          this.game.gameId = game;
        }
    });

    this.webSocketService.listen('userJoined').subscribe((user) => {
      this.users.push(user);
    });

    this.webSocketService.listen('gameBuzz').subscribe((user: string) => {
      this.buzzedUser = user;
    });
  }

  onReset() {
    this.buzzedUser = '';
    this.webSocketService.emit('unlockBuzzers', this.game, (ack) => {
      console.log(ack);
    });
  }
}
