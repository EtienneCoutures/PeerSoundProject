"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OfflineFeaturesLogService = /** @class */ (function () {
    function OfflineFeaturesLogService() {
        this.messages = [];
        this.limit = 5;
    }
    OfflineFeaturesLogService.prototype.add = function (message) {
        this.messages.push(message);
        if (this.limit != 0 && this.messages.length > this.limit)
            this.messages.shift();
    };
    OfflineFeaturesLogService.prototype.clear = function () {
        this.messages = [];
    };
    OfflineFeaturesLogService.prototype.getLastMsg = function () {
        if (this.messages.length)
            return this.messages[this.messages.length - 1];
        return undefined;
    };
    OfflineFeaturesLogService.prototype.replaceLastMsg = function (msg) {
        if (this.messages.length)
            this.messages[this.messages.length - 1] = msg;
    };
    OfflineFeaturesLogService.prototype.setMsgLimit = function (limit) {
        this.limit = limit;
    };
    OfflineFeaturesLogService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OfflineFeaturesLogService);
    return OfflineFeaturesLogService;
}());
exports.OfflineFeaturesLogService = OfflineFeaturesLogService;
//# sourceMappingURL=offline-features-log.service.js.map