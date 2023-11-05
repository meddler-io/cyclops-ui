import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

import { ApiService } from '../api.service';

const REGEX_GIT_REPO = "'(w+://)(.+@)*([wd.]+)(:[d]+){0,1}/*(.*)'"
const URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/


@Component({
  selector: 'app-static-config',
  templateUrl: './static-config.component.html',
  styleUrls: ['./static-config.component.scss']
})
export class StaticConfigComponent implements OnInit, OnDestroy {

  searchBranchFilter = new FormControl('');

  editEnabled = false;

  inputKey = 'GIT_URL';

  options: string[];
  filteredOptions$: Observable<string[]>;
  gitRepoInputFormControl: FormControl = new FormControl('', [Validators.required]);

  gitBranchInputFormControl: FormControl = new FormControl('', [Validators.required]);

  enableFormEdit() {
    if (this.loadingGeneric == false && this.editEnabled == false) {
      this.editEnabled = true;
    }
  }

  selectedApp = this.apiService.selectedApp.pipe(
    filter(_ => !!_?.identifier),
    map(app => {
      return {
        businessId: app?.businessId,
        projectId: app?.projectId,
        platformId: app?.platformId,
        applicationId: app?.application?.applicationId
      }
    }),
    // shareReplay()
  )

  setAutoSuggestions = this.getAutoSuggestions().pipe(
    tap(
      _ => {

        this.filteredOptions$ = this.gitRepoInputFormControl.valueChanges
          .pipe(
            startWith(''),
            map(filterString => this.filter(filterString)),
          );
      }
    )
  );

  initSubscription$: Subscription = Subscription.EMPTY;
  loadControlData() {

    this.editEnabled = false;

    this.loadingGeneric = true;
    this.gitRepoInputFormControl.setValue('');
    this.gitBranchInputFormControl.setValue('');


    this.initSubscription$ = this.selectedApp.pipe(
      take(1),
      tap(_ => {
        console.log('selectedApp', 'static', _)


      }),
      switchMap(appDetails => {
        return this.apiService.getDevsecopsStaticScanData(appDetails).pipe()
      }),

      tap(scan_details => {
        this.gitRepoInputFormControl.setValue(scan_details?.GIT_URL);
        this.gitBranchInputFormControl.setValue(scan_details?.GIT_BRANCH);

      }),

      // switchMap(_ => {
      //   return this.setAutoSuggestions;
      // })


    ).subscribe(scan_details => {

      this.loadingGeneric = false;
    })


  }

  constructor(
    private apiService: ApiService,
    private dialogService: NbDialogService

  ) { }
  ngOnDestroy(): void {
    console.log('ngOnDestroy', 'staticconfig')

    this.initSubscription$.unsubscribe()
  }

  ngOnInit(): void {



    console.log('ngOnInit', 'staticconfig')
    this.initSubscription$.unsubscribe()

    // this.filteredOptions$ = of(this.options);


    this.loadControlData()










  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }


  viewHandle(value: string) {
    return value;
  }


  getAutoSuggestions() {

    return this.apiService.selectedApp.pipe(

      filter(app => !!app?.application?.applicationId),

      switchMap(app => {

        return this.apiService.getAutoSuggestions({
          businessId: app?.businessId,
          projectId: app?.projectId,
          platformId: app?.platformId,
          applicationId: app?.application?.applicationId
        });

      })

      ,

      map(appSuggestions => {



        console.log('GIT_URL', appSuggestions?.data?.GIT_URL)
        // return  ['Options 1', 'Option 2', 'Option 3'];
        // this.options = ['Option 1', 'Option 2', 'Option 3'];
        // return;
        if (appSuggestions?.data?.GIT_URL)
          this.options = appSuggestions?.data?.GIT_URL;
        else
          this.options = []
        // return app
      }),






    )


  }


  loadingGeneric = false;

  save(ref: NbDialogRef<any>) {

    // this.apiService.lsremote(this.gitRepoInputFormControl.value).subscribe(ref.close)

    // return;
    let _$ = this.selectedApp.pipe(
      take(1),

      switchMap(appDetails => {

        let scanDetails = {
          'GIT_URL': this.gitRepoInputFormControl.value,
          'GIT_BRANCH': this.gitBranchInputFormControl.value,

        }
        return this.apiService.addDevsecopsStaticScanDetails(appDetails, scanDetails)
          .pipe(
            tap(_ => {
              this.loadingGeneric = true;
            })
          )
      })
    ).subscribe(_ => {
      this.loadingGeneric = false;
      ref.close();
      _$.unsubscribe()


    })
  }

  openDialog(dialog: TemplateRef<any>) {


    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {
        git_url: this.gitRepoInputFormControl.value,
        lsRemote: this.apiService.lsremote(this.gitRepoInputFormControl.value)
          .pipe(
            switchMap(_ => {

              return this.searchBranchFilter.valueChanges.pipe(
                startWith(this.searchBranchFilter.value)
              ).pipe(
                map(val => {

                  console.debug('map_val', val, _);
                  if (_.status == false) {
                    return [];
                  }

                  return Object.keys(
                    _?.data
                  ).filter(branch => {
                    return branch.toLowerCase().indexOf(val) != -1
                  })

                })
              );
            })
          )
          .pipe(

            map((branches: [] | undefined) => {


              return branches.map((b: string) => {
                return b.split('/').pop()
              })
            })
            ,
            shareReplay()
          )
      }
    }).onClose.subscribe(_ => {

      this.loadControlData()

    });
  }


  selectBranch(branch) {
    this.gitBranchInputFormControl.setValue(branch);
  }

}
