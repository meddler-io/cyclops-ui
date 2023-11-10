import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { ApiService } from '../api.service';
import { Observable, EMPTY, Subscription, tap, map, mergeMap, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-apps-sidebar',
  templateUrl: './manage-apps-sidebar.component.html',
  styleUrls: ['./manage-apps-sidebar.component.scss']
})
export class ManageAppsSidebarComponent implements OnInit, OnDestroy {

  
  inputProjectFormControl: FormControl;
  businessMaping = this.apiService.businessMaping()

  filteredControlOptions: Observable<any> = this.businessMaping;

  applications = this.apiService.getApplications()

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public accessChecker: NbAccessChecker,
    private router: Router

  ) { }

  manageApp(appId){

    this.router.navigate(   [  {'outlets' : { 'primary': ['manage-apps', appId]  } } ] , {relativeTo:  this.activatedRoute.parent})
  }

  ngOnInit(): void {

    this.inputProjectFormControl = new FormControl();
    this.filteredControlOptions = this.inputProjectFormControl.valueChanges
      .pipe(
        startWith(''),
        mergeMap(filterString => this.filter(filterString)),
      );


    console.log('activatedRoute', this.activatedRoute.snapshot.parent.url)

  }

  ngOnDestroy(): void {



  }

  private filter(value: any) {
    const filterValue = value.toLowerCase();
    return this.businessMaping
      .pipe(

        map((_: any) => {
          // If business name matches
          // return _.filter((optionValue: any) => optionValue?.name?.toLowerCase().includes(filterValue))

          let searchedResults = []
          _.forEach(element => {

            if (element?.name?.toLowerCase().includes(filterValue)) {
              searchedResults.push(element)
            }
            else {
              let projects = [];
              element?.projects?.forEach(element => {

                if (element?.name?.toLowerCase().includes(filterValue)) {
                  projects.push(element);
                }

              });

              if (projects.length > 0) {
                element.projects = projects;
                searchedResults.push(element)

              }


            }
          });
          // If project name matches

          return searchedResults
        })

      )

  }

}
