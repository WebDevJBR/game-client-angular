import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"

import { WebSocketService } from '../core/services/web-socket.service';
import { GameService } from '../core/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('gameForm',  {static: false}) gameForm: NgForm;

  constructor(private router: Router, private webSocketService: WebSocketService, private gameService: GameService) { }

  ngOnInit() {
  }

  onSubmit() {

    this.gameService.setGame(this.gameForm.value.gameId);
    
    // Create game from ID.
    this.webSocketService.emit('hostGame', this.gameForm.value.gameId, (ack) => {
      console.log(ack);
    });

    this.router.navigate(['/game']);
  }



}
