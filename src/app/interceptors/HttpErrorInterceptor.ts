import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError, from, of, BehaviorSubject } from 'rxjs';

import { tap, catchError, map } from 'rxjs/operators';
import { NbAuthService, NbTokenService, NbAuthToken, NbAuthJWTToken } from '@nebular/auth';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: NbAuthService,
    private tokenService: NbTokenService

  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let TOKEN = ""
    let STRATEGY = ""

    return of(this.authService.getToken().subscribe(data => {
      // 
      
      TOKEN = data.getValue()
      STRATEGY = data["ownerStrategyName"]
      return data
    }))

      .pipe(token => {
        // 
        // request.headers = request.headers.append('Authorization' , `Bearer ${TOKEN}`)
        if(request.url.includes(environment.url)){
          request = request.clone({
            headers:  request.headers.append('Authorization' , `Bearer ${TOKEN}`),
          });
        }
        
        
        return next.handle(request).pipe(map(event => {
          
          if (event instanceof HttpResponse && event.status == 200) {
            
            if (event.headers.get("TokenValue") != undefined){
              
              if(event.headers.get("TokenValue") == ""){
                this.tokenService.clear();
              }
              else if(event.headers.get("TokenValue") == "OK"){
                console.log("OK")
              }
              else if(event.headers.get("TokenValue") != "OK"){
                
                let token = new NbAuthJWTToken(event.headers.get("TokenValue"), STRATEGY)
                console.log('token', token, token.getPayload())
                this.tokenService.set(token)
              }
            }
            // if(Object.keys(event.body).indexOf("Token") >= 0){

            //   if(event.body["Token"] == "OK")
            //   this.tokenService.clear()
            // }
            
          }         
          return event;
        }))

          .pipe(
            // tap(data => ,
            catchError((error: HttpErrorResponse) => {
              if (error.error instanceof ErrorEvent) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', error.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(
                  `Backend returned code ${error.status}, ` +
                  `body was: ${error.error}`);
              }
              // return an observable with a user-facing error message
              return throwError(
                'Something bad happened; please try again later.');
            })
          );
      })




  }
}