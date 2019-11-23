import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

    socket: any;
    readonly uri: string = 'ws://localhost:4000';

    constructor() { 
        this.socket = io(this.uri);
    }

    listen(eventName: string) {
        return new Observable((subscriber) => { 
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            })
        });
    }

    emit(eventName: string, data: any, callback: (ack: any) => any) {
        this.socket.emit(eventName, data, (ack) => {
            callback(ack);
        });
    }
}