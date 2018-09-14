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

import { MatDialogModule,
         MatDialogRef,
         MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatRippleModule,
         MatDividerModule,
         MatBadgeModule,
         MatListModule,
         MatExpansionModule
       } from '@angular/material';

import { MatIconModule } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { DialogOverviewExampleDialog } from './create-playlist/create-playlist.component';
import { SocialBoutonComponent } from './social-bouton/social-bouton.component';
import { OptionsPlComponent } from './options-pl/options-pl.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    SocialBoutonComponent,
    OptionsPlComponent
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
