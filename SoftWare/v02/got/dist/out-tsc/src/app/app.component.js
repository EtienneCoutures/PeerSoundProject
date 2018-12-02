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
var electron_service_1 = require("./providers/electron.service");
var core_2 = require("@ngx-translate/core");
var environment_1 = require("../environments/environment");
var AppComponent = /** @class */ (function () {
    function AppComponent(electronService, translate) {
        this.electronService = electronService;
        this.translate = translate;
        translate.setDefaultLang('en');
        console.log('AppConfig', environment_1.AppConfig);
        if (electronService.isElectron()) {
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
            console.log('Electron sercice: ', electronService);
        }
        else {
            console.log('Mode web');
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        /*const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from("app-dark-theme").filter((item: string) => item.includes('-theme'));
        if (themeClassesToRemove.length) {
          overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(themeClass);*/
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [electron_service_1.ElectronService,
            core_2.TranslateService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map