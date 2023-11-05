import { CommonModule } from '@angular/common';
import { NgModule, Injectable, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType, NbAuthOAuth2JWTToken, NbOAuth2ClientAuthMethod, NbAuthOAuth2Token, NbOAuth2AuthStrategyOptions, NbAuthStrategyClass, NbAuthResult, NbAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbActionsModule,
  NbCardModule,
  NB_WINDOW,
  NbIconModule,
  NbLayoutModule
} from '@nebular/theme';
import { LoginComponent } from './login/login/login.component';
import { CallbackComponent } from './login/callback/callback.component';

import { LogooutComponent } from './login/logoout/logoout.component';

import { WrapperComponent } from './login/wrapper/wrapper.component';
import { environment } from 'src/environments/environment';


const baseUrl = environment.url;
const mainUrl = environment.main_url;


// / Override 'token' to 'id_token' for Azure AD B2C
// (NbOAuth2ResponseType as any)['CODE'] = 'id_token';
// (NbOAuth2ResponseType as any)['TOKEN'] = 'id_token';
// let fb_token = NbOAuth2ResponseType.TOKEN
// (NbOAuth2ResponseType as any)['TOKEN'] = 'id_token';


// (NbOAuth2ResponseType as any)['TOKEN'] = "id_token"


@Injectable()
export class NbGoogleOAuth2Strategy extends NbOAuth2AuthStrategy {

  static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [NbGoogleOAuth2Strategy, options]; // HERE we make sure our strategy reutrn correct class reference
  }
}

//(NbOAuth2ResponseType as any)['TOKEN'] = 'id_token';
// (NbOAuth2ResponseType as any)['CODE'] = 'token'; last
(NbOAuth2ResponseType as any)['TOKEN'] = 'token';

export class TestGoogle {


  static get() {
    return NbGoogleOAuth2Strategy.setup({
      name: 'google',
      // clientId: '406700580633-acocvh36rh9a17ob8at731gg4amtcle0.apps.googleusercontent.com',
      // clientSecret: 'cfUWzJ7dQIOc-Gqv5ay847L8',
      clientId: '441029471840-i0iutlkhshqfcf0l9q1tuqmiis4cau96.apps.googleusercontent.com', //'684398764352-qmtfq0ph7te46uhvijoobqja8ch4g5ct.apps.googleusercontent.com',
      clientSecret: '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', //'OgwwPEOmBNYhmmutOIZm_o7a',

      authorize: {

        endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        responseType: NbOAuth2ResponseType.TOKEN,
        // requireValidToken: true,
        scope: 'https://www.googleapis.com/auth/userinfo.profile email',

        redirectUri: mainUrl + '/auth/callback/google',

        // params: {
        //   "nonce": "8976",
        //   "response_mode": "query"
        // },
      },

    });

  }
}


@NgModule({
  imports: [

    NbIconModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,

    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbActionsModule,
    NbCardModule,
    NbAuthModule,
    NbLayoutModule
  ],

  declarations: [
    // ... here goes our new components
    LoginComponent,
    CallbackComponent,
    LogooutComponent,
    WrapperComponent,


  ],


})
export class NgxAuthModule {
}