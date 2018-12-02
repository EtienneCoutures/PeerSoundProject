"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-mix");
require("reflect-metadata");
require("../polyfills");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
// NG Translate
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var electron_service_1 = require("./providers/electron.service");
var webview_directive_1 = require("./directives/webview.directive");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./login/login.component");
var playlist_component_1 = require("./playlist/playlist.component");
var new_account_component_1 = require("./new-account/new-account.component");
var playlist_list_component_1 = require("./playlist-list/playlist-list.component");
var music_list_component_1 = require("./music-list/music-list.component");
var music_component_1 = require("./music/music.component");
var create_playlist_component_1 = require("./create-playlist/create-playlist.component");
var new_playlist_component_1 = require("./new-playlist/new-playlist.component");
var animations_1 = require("@angular/platform-browser/animations");
var options_pl_component_1 = require("./options-pl/options-pl.component");
var material_1 = require("@angular/material");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var ngx_scrollbar_1 = require("ngx-scrollbar");
var icon_1 = require("@angular/material/icon");
var create_playlist_component_2 = require("./create-playlist/create-playlist.component");
var social_bouton_component_1 = require("./social-bouton/social-bouton.component");
var options_pl_component_2 = require("./options-pl/options-pl.component");
var user_component_1 = require("./user/user.component");
var user_list_component_1 = require("./user-list/user-list.component");
var events_component_1 = require("./events/events.component");
var info_playlist_component_1 = require("./info-playlist/info-playlist.component");
var user_info_component_1 = require("./user-info/user-info.component");
var user_options_component_1 = require("./user-options/user-options.component");
var music_list_panel_component_1 = require("./music-list-panel/music-list-panel.component");
var music_list_offline_component_1 = require("./music-list-offline/music-list-offline.component");
var offline_features_log_component_1 = require("./offline-features-log/offline-features-log.component");
var snack_bar_component_1 = require("./snack-bar/snack-bar.component");
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                webview_directive_1.WebviewDirective,
                login_component_1.LoginComponent,
                playlist_component_1.PlaylistComponent,
                new_account_component_1.NewAccountComponent,
                playlist_list_component_1.PlaylistListComponent,
                music_list_component_1.MusicListComponent,
                music_component_1.MusicComponent,
                create_playlist_component_1.CreatePlaylistComponent,
                new_playlist_component_1.NewPlaylistComponent,
                create_playlist_component_2.DialogOverviewExampleDialog,
                options_pl_component_1.DialogInvitePeople,
                social_bouton_component_1.SocialBoutonComponent,
                options_pl_component_2.OptionsPlComponent,
                user_component_1.UserComponent,
                user_list_component_1.UserListComponent,
                events_component_1.EventsComponent,
                info_playlist_component_1.InfoPlaylistComponent,
                user_info_component_1.UserInfoComponent,
                user_options_component_1.UserOptionsComponent,
                music_list_panel_component_1.MusicListPanelComponent,
                music_list_offline_component_1.MusicListOfflineComponent,
                offline_features_log_component_1.OfflineFeaturesLogComponent,
                snack_bar_component_1.SnackBarComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatDialogModule,
                material_1.MatButtonModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatRippleModule,
                material_1.MatDividerModule,
                icon_1.MatIconModule,
                material_1.MatBadgeModule,
                material_1.MatListModule,
                material_1.MatExpansionModule,
                material_1.MatToolbarModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                ngx_scrollbar_1.ScrollbarModule,
                material_1.MatSnackBarModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (HttpLoaderFactory),
                        deps: [http_1.HttpClient]
                    }
                }),
            ],
            entryComponents: [
                create_playlist_component_2.DialogOverviewExampleDialog,
                options_pl_component_1.DialogInvitePeople,
                snack_bar_component_1.SnackBarComponent
            ],
            providers: [electron_service_1.ElectronService, { provide: ngx_perfect_scrollbar_1.PERFECT_SCROLLBAR_CONFIG,
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map