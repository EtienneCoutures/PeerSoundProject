import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Event } from './events/events.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  messages: Subject<any>;
  events: Array<Event> = new Array<Event>();

  constructor(private wsService: WebSocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {

        return response;
      })
   }

   invitSent(invit) {
     //this.messages.
     //this.messages.invitSent(invit);
   }

   connect(account) {
     //this.messages.onConnection(account);
   }

  sendMsg(msg) {
    this.messages.next(msg);
  }
}
