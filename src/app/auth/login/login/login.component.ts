import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {


  appname = environment.appname

  hoverOnItem = '';

  // 406700580633-acocvh36rh9a17ob8at731gg4amtcle0.apps.googleusercontent.com
  // cfUWzJ7dQIOc-Gqv5ay847L8

  ngOnInit() {
  }
  // alive = false;

  // login(){
  //   (authService: NbAuthService). .authenticate('email',{email: this.user.email, password: this.user.password})
  //   // .pipe(takeWhile(() => this.alive))
  //   .subscribe((authResult: NbAuthResult) => {
  //     if (authResult.isSuccess()) {
  //       this.router.navigateByUrl('/app');
  //     }
  //   });
  // }

  loginViaGoogle() {

    this.service.authenticate('google')
      // .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        console.log('login', authResult)
      });
  }
 
}