import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthResult, NbAuthToken, NbTokenService, NbAuthJWTToken, NbAuthSimpleToken } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NbRoleProvider } from '@nebular/security';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  // constructor(private activatedRoute: ActivatedRoute) {

  //   this.activatedRoute.queryParamMap.subscribe(d => {
  //     console.log(d)
  //   })

  // }

  ngOnInit() {
  }
  ngOnDestroy() {

  }



  constructor(private authService: NbAuthService,
    private tokenService: NbTokenService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    Role: NbRoleProvider,


    private httpClient: HttpClient
  ) {



    // this.spinner.show('login')


    this.activatedRoute.params.subscribe(params => {

      let source = params.source;


      this.activatedRoute.queryParams.subscribe(queries => {
        queries = queries || {};

        this.activatedRoute.fragment.subscribe((fragment: string) => {

          // this.tokenService.clear()


          let result: { id_token?: string, from?: string } = { 'from': source }

          try {
            fragment.split('&').forEach(item => {
              result[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);

            });
          } catch (err) {

          }


          result = { ...result, ...queries }

          console.log('fragment', result)

          {

            this.httpClient.post(environment.url + '/api/v1/auth/token/' + source, result).subscribe(data => {
              console.log(data['data'])

              if (data['status'] == true) {
                let token = new NbAuthJWTToken(data['data'], 'google')

                console.log('token', token, token.getPayload())
                this.tokenService.set(token)
                // this.tokenService.tokenChange()
                // this.tokenService.

                this.router.navigate(['app'])
                // this.spinner.hide('login')

              } else {
                this.router.navigate(['auth', 'login'])
                // this.spinner.hide('login')
              }


            })
            console.log("My hash fragment is here => ", result)
          }


        })
      })

    })

    // this.authService.onTokenChange().subscribe(data=>{
    //   console.log('navigate',  data, data.isValid(), data.getPayload())
    // if(data.isValid() === true){
    //   this.router.navigate(['app'])
    // }

    // })



  }



}
