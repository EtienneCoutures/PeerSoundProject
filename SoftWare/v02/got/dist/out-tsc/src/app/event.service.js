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
var web_socket_service_1 = require("./web-socket.service");
var EventService = /** @class */ (function () {
    function EventService(wsService) {
        this.wsService = wsService;
        this.events = new Array();
        this.messages = wsService
            .connect()
            .map(function (response) {
            return response;
        });
    }
    EventService.prototype.invitSent = function (invit) {
        //this.messages.
        //this.messages.invitSent(invit);
    };
    EventService.prototype.connect = function (account) {
        //this.messages.onConnection(account);
    };
    EventService.prototype.sendMsg = function (msg) {
        this.messages.next(msg);
    };
    EventService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [web_socket_service_1.WebSocketService])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map