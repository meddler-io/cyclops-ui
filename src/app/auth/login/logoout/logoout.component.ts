import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';
import { NbRoleProvider } from '@nebular/security';

@Component({
  selector: 'app-logoout',
  templateUrl: './logoout.component.html',
  styleUrls: ['./logoout.component.scss']
})
export class LogooutComponent implements OnInit {

  constructor(private authService: NbAuthService, private tokenService: NbTokenService,
    private router: Router,

    private _: NbRoleProvider) {


    tokenService.clear().subscribe(_ => {
      tokenService.tokenChange()
      this.router.navigate(['auth', 'login'])
    })


    // this.authService.getToken()
    // this.authService.logout("")
  }

  ngOnInit() {
  }

}
