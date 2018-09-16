import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

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
         MatToolbarModule
       } from '@angular/material';

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
    UserOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    ScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogInvitePeople
  ],
  providers: [ElectronService, {provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}],
  bootstrap: [AppComponent]
})
export class AppModule { }
