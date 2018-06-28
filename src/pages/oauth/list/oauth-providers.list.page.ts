import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuthService } from '../oauth.service';
import { OAuthProfilePage } from '../profile/oauth-profile.page';
import { Login } from '../../login/login';

@Component({
    templateUrl: 'oauth-providers.list.html',
    providers: [OAuthService]
})
export class OAuthProvidersListPage {
    private oauthService: OAuthService;
    private nav: NavController;

    constructor(oauthService: OAuthService, nav: NavController) {
        this.oauthService = oauthService;
        this.nav = nav;
    }

    // public login(source: string) {
    //     console.log("hitting google service", source);
    //     this.oauthService.login(source)
    //         .then(
    //             () => console.log('Logged in successfully')
    //             // error => alert(error)
    //         );
    // }
    public login(source: string) {
        this.oauthService.login(source)
            .then(
                () => this.nav.setRoot(OAuthProfilePage),
                error => alert(error)
            );
    }

    public signin() {
        this.nav.push(Login);
    }
}