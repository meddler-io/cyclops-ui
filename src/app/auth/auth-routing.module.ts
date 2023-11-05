import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent, NbLogoutComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from '@nebular/auth';  // <---
import { LoginComponent } from './login/login/login.component';
import { CallbackComponent } from './login/callback/callback.component';
import { LogooutComponent } from './login/logoout/logoout.component';
import { NbCardComponent } from '@nebular/theme';
import { WrapperComponent } from './login/wrapper/wrapper.component';





export const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent, // <---
      },
      {
        path: 'callback/:source',
        component: CallbackComponent, // <---
      },

      {
        path: 'logout',
        component: LogooutComponent,
      },
    

      {
        path: '**',
        component: LogooutComponent,
      },


    ]
    // <---
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}