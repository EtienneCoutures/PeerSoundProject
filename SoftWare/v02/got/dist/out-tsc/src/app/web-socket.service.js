"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var io = require("socket.io-client");
var Observable_1 = require("rxjs/Observable");
var Rx = require("rxjs/Rx");
//import { environment } from '../environments/environment';
var WebSocketService = /** @class */ (function () {
    function WebSocketService() {
    }
    WebSocketService.prototype.connect = function () {
        var _this = this;
        this.socket = io('http://localhost:8000');
        var observable = new Observable_1.Observable(function (observer) {
            _this.socket.on('message', function (data) {
                console.log("Received message from Websocket Server");
                observer.next(data);
            });
            return function () {
                _this.socket.disconnect();
            };
        });
        var observer = {
            next: function (data) {
                _this.socket.emit('message', JSON.stringify(data));
            },
            connect: function (data) {
                _this.socket.emit('connection', JSON.stringify(data));
            },
            invitSent: function (data) {
                _this.socket.emit('invitSent', JSON.stringify(data));
            }
        };
        return Rx.Subject.create(observer, observable);
    };
    WebSocketService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], WebSocketService);
    return WebSocketService;
}());
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=web-socket.service.js.map