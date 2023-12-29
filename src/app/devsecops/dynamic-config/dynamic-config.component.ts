import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take, tap } from 'rxjs/operators';

import { ApiService } from '../api.service';

const REGEX_GIT_REPO = "'(w+://)(.+@)*([wd.]+)(:[d]+){0,1}/*(.*)'"
const URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/


@Component({
  selector: 'app-dynamic-config',
  templateUrl: './dynamic-config.component.html',
  styleUrls: ['./dynamic-config.component.scss']
})
export class DynamicConfigComponent implements OnInit , OnDestroy {


  editEnabled = false;

  inputKey = 'GIT_URL';

  options: string[];
  filteredOptions$: Observable<string[]>;
  appUrlInputFormControl: FormControl = new FormControl('', [Validators.required]);



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

        this.filteredOptions$ = this.appUrlInputFormControl.valueChanges
          .pipe(
            startWith(''),
            map(filterString => this.filter(filterString)),
          );
      }
    )
  );
  ngOnDestroy(): void {

    this.initSubscription$.unsubscribe()
  }

  loadControlData() {

    this.editEnabled = false;
    this.loadingGeneric = true;
    this.appUrlInputFormControl.setValue('');



    this.initSubscription$ = this.selectedApp.pipe(
      take(1),
      switchMap(appDetails => {
        return this.apiService.getDevsecopsDynamicScanData(appDetails).pipe()
      }),

      tap(scan_details => {
        this.appUrlInputFormControl.setValue(scan_details?.APP_URL);


      }),

      // switchMap(_ => {
      //   return this.setAutoSuggestions;
      // })


    ).subscribe(scan_details => {

      this.loadingGeneric = false;
    })


  }

  initSubscription$: Subscription = Subscription.EMPTY;


  constructor(
    private apiService: ApiService,
    private dialogService: NbDialogService

  ) { }

  ngOnInit(): void {
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
    this.selectedApp.pipe(
      take(1),

      switchMap(appDetails => {

        let scanDetails = {
          'APP_URL': this.appUrlInputFormControl.value,


        }
        return this.apiService.addDevsecopsDynamicScanDetails(appDetails, scanDetails)
          .pipe(
            tap(_ => {
              this.loadingGeneric = true;
            })
          )
      })
    ).subscribe(_ => {
      this.loadingGeneric = false;
      ref.close()

    })
  }

  openDialog(dialog: TemplateRef<any>) {


    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {
        app_url: this.appUrlInputFormControl.value,
        lsRemote: this.apiService.healthcheck(this.appUrlInputFormControl.value)
          .pipe(map(_ => {

            return { status_code: _?.status_code }

          }
          ),

          )
      }
    }).onClose.subscribe(_ => {

      this.loadControlData()

    });
  }




}
