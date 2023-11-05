import { animate, style, transition, trigger } from '@angular/animations';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { distinctUntilChanged, map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
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
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  @Input('dialogRef') dialogRef?: NbDialogRef<any>;

  searchFieldControl = new FormControl('');


  selectedProject = this.apiService.selectedProject;
  list_items$ = this.selectedProject.pipe(


    switchMap(
      selectedProject => {

        return this.apiService.selectedBusiness.pipe(
          tap((_) => console.log('__', _)),
          map(result => {
            return {
              projects: result?.project,
              selected: selectedProject
            }
          })
        )
      }
    )


    ,
    map(_ => {
      console.log(_)
      return _.projects.filter((val) => {
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
    private apiService: ApiService) { }


  ngOnInit(): void {
  }

  selectProject(index) {
    this.apiService.selectProject(index,
      () => {
        this.dialogRef.close()
      }
    )
  }


  clearSearch() {
    this.searchFieldControl.setValue('')
  }

}
