import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { map } from 'rxjs/operators';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
    console.log('onTokenChange', 'token')


    //this.authService.authenticate('google')
    this.authService.onTokenChange().subscribe( (token:NbAuthJWTToken)=>{
      console.log('onTokenChange', token)

      let Token =  token.isValid() ? token.getPayload()['roles']  : ['guest'];
      this.currentRole.next(  Token );
    })
  }

  private currentRole = new BehaviorSubject([ 'guest'])

  getRole(): Observable<string[]> {

    return this.currentRole.asObservable();

    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          // 
          console.log("Changing_token", token)
          return token.isValid() ? token.getPayload()['roles']  : ['guest'];

          // return ['superadmin'];


        }),
      );
  }
}