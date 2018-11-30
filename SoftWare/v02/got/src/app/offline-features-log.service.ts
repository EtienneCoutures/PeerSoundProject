import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfflineFeaturesLogService {

  messages: string[] = [];
  limit: number = 5;

  add(message: string) {
    this.messages.push(message);
    if (this.limit != 0 && this.messages.length > this.limit)
      this.messages.shift()
  }

  clear() {
    this.messages = [];
  }

  getLastMsg(): string {
    if (this.messages.length)
      return this.messages[this.messages.length - 1]
    return undefined
  }

  replaceLastMsg(msg: string) {
    if (this.messages.length)
      this.messages[this.messages.length - 1] = msg
  }

  setMsgLimit(limit: number) {
    this.limit = limit
  }
}
