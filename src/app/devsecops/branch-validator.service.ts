import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject, EMPTY, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable()
export class BranchValidatorService {

  branches$ = new BehaviorSubject<any[]>([
    3,21321,312,3123,12
  ]);
  branches = this.branches$.asObservable().pipe(
    tap(
      _ => {
        console.log('boomer', _)
      }
    ),
    map(_ => {
      return null;
    })
  )

  constructor() { }

  validateBranch(abstractControl): Observable<ValidationErrors | null> {

    console.log('validateBranch', abstractControl.value);

    return of(EMPTY).pipe(
      tap(
        _ => {
          console.log('boomer', _)
        }
      ),
      // switchMap((_) => this.branches),
      map(_ => {
        return null;
      })
    )

    // this.repoBranchList.includes(abstractControl.value),
    // this.repoBranchList,
    // );

    // return of(null).pipe(
    //   map(_ => {

    //     return  null;

    //     if (this.repoBranchList.includes(abstractControl.value)) {
    //       return  null;
    //     }

    //     return {
    //       "error": "Invalid Branch"
    //     }
    //   })
    // );



  }
}
