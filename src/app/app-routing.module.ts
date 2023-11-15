import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [


  
  {

    canActivate: [AuthGuard],

    path: 'devsec',
    loadChildren: () => import('./devsecops/devsecops.module').then(m => m.DevsecopsModule)
  },

  {


    path: 'app',
    loadChildren: () => import('./devsecops/devsecops.module').then(m => m.DevsecopsModule)
  },

  {

    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  },

  {

    path: '**',

    redirectTo: 'devsec',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
