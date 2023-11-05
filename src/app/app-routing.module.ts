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

    redirectTo: 'app',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
