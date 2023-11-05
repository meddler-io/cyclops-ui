import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbThemeModule, NbThemeService, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthComponent, NbLoginComponent, NbRegisterComponent, NbLogoutComponent, NbRequestPasswordComponent, NbResetPasswordComponent, NbAuthJWTToken, NbOAuth2AuthStrategy, NbOAuth2ResponseType } from '@nebular/auth';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbGoogleOAuth2Strategy, NgxAuthModule, TestGoogle } from './auth/auth.module';
import { AuthGuard } from './AuthGuard';

import { RoleProvider } from './role.provider';
import { environment } from 'src/environments/environment';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    
    
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),

    NbWindowModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    HttpClientModule,
    NbSecurityModule.forRoot({}),
   


    NbAuthModule.forRoot({
      strategies: [

        TestGoogle.get(),

        NbPasswordAuthStrategy.setup({
          name: 'email',
          register: false,
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },

          baseEndpoint: environment.url,
          login: {
            endpoint: '/api/v1/auth/login',
            redirect: {
              success: '/app',
              failure: '/auth/login', // stay on the same page
            },
          },

          logout: {
            endpoint: '/api/v1/auth/logout',
            method: 'post',
            redirect: {
              success: '/',
              failure: '/auth/login', // stay on the same page
            },
          },

        }),

      ],
      forms: {

        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
          register: false,

        },
      },
    }),

    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['guidelines', 'login', 'FAQs', 'security'],
        },

        // Normal User
        client: {
          parent: 'guest',
          view: [ 'active_protection',  'dashboard', 'task', 'history', 'business', 'issue', 'notification', 'ENQUEUED', 'PROCESSING', 'COMPLETED', 'REVALIDATION', 'client', 'project_tagging', 'external_tool'],  //      'inprogress', 'completed', 'enqueued', 'task' , 'dashboard'  ],
          modify: ['inprogress', 'enqueued', 'report'],
          create: ['report', 'business'],

        },

        // Moderator
        user: {
          parent: 'guest',
          view:  [ 'active_protection', 'dashboard' , 'task', 'history', 'business', 'ENQUEUED', 'PROCESSING', 'COMPLETED', 'REVALIDATION', 'issue', 'client', 'admin', 'revalidate', 'hackerone', 'external_tool'],
          modify: ['inprogress', 'enqueued', 'report'],
          create: ['report', 'issue'],

        },
        admin: {
          parent: 'guest',
          view: [ 'bitbucket',   'active_protection' ,  'dashboard', 'task', 'history', 'resource', 'business', 'REQUESTED', 'ENQUEUED', 'PROCESSING', 'COMPLETED', 'REVALIDATION', 'admin', 'client', 'issue', 'project_tagging', 'hackerone', 'external_tool'], //  ['inprogress', 'completed', 'enqueued', 'task', 'request', 'resource'],

          modify: ['bitbucket',  'request', 'issue', 'application' , 'active_protection'],
          create: [ 'bitbucket',  'report', 'business', 'active_protection'],

        },
        superadmin: {
          parent: 'guest',
          create: ['*', 'active_protection' , 'bitbucket' ],
          view: ['*' , 'active_protection', 'bitbucket' ],
          modify: ['*', 'active_protection', 'bitbucket' ],

        }

      },
    }),


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    NbThemeService,
 
    NbGoogleOAuth2Strategy,
    AuthGuard,

    {
      provide: NbRoleProvider, 
      useClass: RoleProvider
    },

    NgxAuthModule,

    {
      provide: NbRoleProvider, 
      useClass: RoleProvider
    },
    { provide: OverlayContainer }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
