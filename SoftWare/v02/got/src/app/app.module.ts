import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { GestureConfig } from '@angular/material';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicComponent } from './music/music.component';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { NewPlaylistComponent } from './new-playlist/new-playlist.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogInvitePeople } from './options-pl/options-pl.component';
import { WebSocketService } from './web-socket.service';
import { EventService } from './event.service';
import { MatTooltipModule } from '@angular/material/tooltip';

import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule,
         MatDialogRef,
         MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatRippleModule,
         MatDividerModule,
         MatBadgeModule,
         MatListModule,
         MatExpansionModule,
         MatToolbarModule,
         MatSnackBarModule,
         MatSliderModule,
       } from '@angular/material';

import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { PerfectScrollbarModule
        , PERFECT_SCROLLBAR_CONFIG
        , PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ScrollbarModule } from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { DialogOverviewExampleDialog } from './create-playlist/create-playlist.component';
import { SocialBoutonComponent } from './social-bouton/social-bouton.component';
import { OptionsPlComponent } from './options-pl/options-pl.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { EventsComponent } from './events/events.component';
import { InfoPlaylistComponent } from './info-playlist/info-playlist.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserOptionsComponent } from './user-options/user-options.component';
import { MusicListPanelComponent } from './music-list-panel/music-list-panel.component';
import { MusicListOfflineComponent } from './music-list-offline/music-list-offline.component';
import { OfflineFeaturesLogComponent } from './offline-features-log/offline-features-log.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { YtPlayerComponent } from './yt-player/yt-player.component';
import { LocalPlayerComponent } from './local-player/local-player.component';

import 'hammerjs';
import { MusicOptionsMenuComponent } from './music-options-menu/music-options-menu.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    LoginComponent,
    PlaylistComponent,
    NewAccountComponent,
    PlaylistListComponent,
    MusicListComponent,
    MusicComponent,
    CreatePlaylistComponent,
    NewPlaylistComponent,
    DialogOverviewExampleDialog,
    DialogInvitePeople,
    SocialBoutonComponent,
    OptionsPlComponent,
    UserComponent,
    UserListComponent,
    EventsComponent,
    InfoPlaylistComponent,
    UserInfoComponent,
    UserOptionsComponent,
    MusicListPanelComponent,
    MusicListOfflineComponent,
    OfflineFeaturesLogComponent,
    SnackBarComponent,
    YtPlayerComponent,
    LocalPlayerComponent,
    MusicOptionsMenuComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    ScrollbarModule,
    MatSnackBarModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    // MatSlider
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogInvitePeople,
    SnackBarComponent
  ],
  providers: [
    ElectronService,
    {provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
