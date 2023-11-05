import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',

  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'scale(0)', opacity: 0}),
          animate('300ms', style({transform: 'scale(1)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  @Input('dialogRef') dialogRef?: NbDialogRef<any>;

  searchFieldControl = new FormControl('');



  selectedBusiness = this.apiService.selectedBusiness;
  list_items$ = this.selectedBusiness.pipe(



    // filter(_ => !!_),

    switchMap(
      selectedBusiness => {

        return this.apiService.appHier.pipe(
          tap((_) => console.log('__', _)),
          map(result => {
            return {
              projectCount: result?.project?.length | 0,
              business: result,
              selected: selectedBusiness
            }
          })
        )
      }
    )


    ,
    map(_ => {
      console.log(_)
      return _.business.filter((val) => {
        val.projectCount = val?.project?.length | 0;

        return true;
        return val?._id?.$oid != _.selected?._id?.$oid
      })

    })
  )


  list_items = this.searchFieldControl.valueChanges.pipe(



    distinctUntilChanged(),


    // debounceTime(1000),

    startWith(
      this.searchFieldControl.value
    ),


    switchMap(
      (searchField: string) => {

        searchField = searchField?.toLowerCase()
        // console.log(
        //   'babla', searchField
        // )
        return this.list_items$.pipe(
          map((listItems: []) => {
            console.log(
              'babla', listItems
            )
            return listItems.filter((_: any) => {
              return _?.title?.toLowerCase().startsWith(searchField)
            });
          })
        )
      }
    )



  )




  constructor(
    private apiService: ApiService,


  ) { }

  ngOnInit(): void {

    console.log(
      'dialogRef', this.dialogRef
    )

  }

  selectBusiness(index) {
    this.apiService.selectBusiness(index,
      () => {
        this.dialogRef.close(true)
      }
    )
  }


  clearSearch() {
    this.searchFieldControl.setValue('')
  }
}
