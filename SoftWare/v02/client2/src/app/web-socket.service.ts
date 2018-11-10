import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { Event } from './events/events.component';
//import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // Our socket connection
private socket;

constructor() { }

connect(): Rx.Subject<Event> {
  this.socket = io('http://localhost:8000');

  let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("Received message from Websocket Server")
        observer.next(data);
      })

      return () => {
        this.socket.disconnect();
      }
  });

  let observer = {
      next: (data: Object) => {
          this.socket.emit('message', JSON.stringify(data));
      },
      connect: (data: Object) => {
          this.socket.emit('connection', JSON.stringify(data));
      },
      invitSent: (data: Object) => {
          this.socket.emit('invitSent', JSON.stringify(data));
      }
  };

  return Rx.Subject.create(observer, observable);
}

}
