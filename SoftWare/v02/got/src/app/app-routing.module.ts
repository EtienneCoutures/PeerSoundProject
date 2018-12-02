import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAccountComponent } from './new-account/new-account.component';
import { NewPlaylistComponent } from './new-playlist/new-playlist.component';
import { EventsComponent } from './events/events.component';
import { InfoPlaylistComponent } from './info-playlist/info-playlist.component'

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children : [    {
                  path : 'events',
                  component: EventsComponent,
                  outlet: "homeOutlet"
                },
                {
                  path : 'infoPlaylist',
                  component: InfoPlaylistComponent,
                  outlet: "homeOutlet"
                }
]
    },
    {
        path: '',
        component: LoginComponent
    },
    {
      path: 'newAccount',
      component: NewAccountComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
