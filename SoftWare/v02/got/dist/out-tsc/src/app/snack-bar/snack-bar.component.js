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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var SnackBarComponent = /** @class */ (function () {
    function SnackBarComponent(data) {
        this.data = data;
        console.log('data: ', this.data);
        this.type = this.data.type;
        this.message = this.data.message;
    }
    SnackBarComponent.prototype.ngOnInit = function () {
    };
    SnackBarComponent = __decorate([
        core_1.Component({
            selector: 'app-snack-bar',
            templateUrl: './snack-bar.component.html',
            styleUrls: ['./snack-bar.component.scss']
        }),
        __param(0, core_1.Inject(material_1.MAT_SNACK_BAR_DATA)),
        __metadata("design:paramtypes", [Object])
    ], SnackBarComponent);
    return SnackBarComponent;
}());
exports.SnackBarComponent = SnackBarComponent;
//# sourceMappingURL=snack-bar.component.js.map