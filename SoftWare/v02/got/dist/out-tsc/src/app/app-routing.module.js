"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./login/login.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var new_account_component_1 = require("./new-account/new-account.component");
var events_component_1 = require("./events/events.component");
var info_playlist_component_1 = require("./info-playlist/info-playlist.component");
var routes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        children: [{
                path: 'events',
                component: events_component_1.EventsComponent,
                outlet: "homeOutlet"
            },
            {
                path: 'infoPlaylist',
                component: info_playlist_component_1.InfoPlaylistComponent,
                outlet: "homeOutlet"
            }
        ]
    },
    {
        path: '',
        component: login_component_1.LoginComponent
    },
    {
        path: 'newAccount',
        component: new_account_component_1.NewAccountComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map