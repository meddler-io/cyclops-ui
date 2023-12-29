import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbSidebarService, NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { ApiService } from '../api.service';
import { DrawerService } from '../drawer/drawer.service';
import { StateManagerService } from '../state-manager.service';
import { FormControl, Validators } from '@angular/forms';
import { map, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { Platform } from 'src/environments/constants';


@Component({
  selector: 'app-create-sast',
  templateUrl: './create-sast.component.html',
  styleUrls: ['./create-sast.component.scss']
})
export class CreateSastComponent {

  @Input('environment') environment = 'staging'

  @Input('application_id') application_id = undefined;
  application;

  repository: FormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  repositoryPlaceholder;
  repositoryBranch: FormControl = new FormControl('', [Validators.required]);
  searchBranchFilter = new FormControl('');

  changelogs = new FormControl('', [Validators.required]);


  repositoryEditEnabled = false;


  tags: Set<string> = new Set<string>();
  options: string[] = [];

  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.tags.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  selectBranch(branch) {
    console.log('selectBranch', branch)
    this.repositoryBranch.setValue(branch);
  }


  repositoryToggleEditMode() {
    if (!this.repositoryEditEnabled) {
      this.repositoryPlaceholder = this.repository.value;
      this.repositoryEditEnabled = true;
    }
  }

  repositoryFocusout() {
    if (this.repositoryEditEnabled) {

      this.repository.setValue(this.repositoryPlaceholder);
      this.repositoryPlaceholder = '';
      this.repositoryEditEnabled = false;
      // console.log('urlFocusout', this.urlPlaceholder)
    }
  }
  resetAllFormFields() {


    this.repository.setValue('');
    this.repositoryBranch.setValue('');

  }

  constructor(
    private apiService: ApiService,
    private drawerMngr: DrawerService,
    private nbSidebarService: NbSidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateManagerService: StateManagerService,
    private dialogService: NbDialogService,



  ) { }
  ngOnInit(): void {

    this.setApplicationRef();

  }

  updateGitRepository() {

  }


  openDialogToSaveRepository(dialog: TemplateRef<any>, id: string, url: string) {

    this.searchBranchFilter.setValue('');
    this.repositoryEditEnabled = false;

    console.log('openDialogToSaveRepository', id, url)

    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {
        git_url: url,
        lsRemote: this.apiService.lsremote(url)
          .pipe(
            switchMap(_ => {


              return this.searchBranchFilter.valueChanges.pipe(
                startWith(this.searchBranchFilter.value)
              ).pipe(
                map(val => {

                  console.debug('map_val', val, _);
                  if (_.status == false) {
                    return undefined;
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

              if (branches == undefined) {
                return true;
              }

              return branches.map((b: string) => {
                return b.split('/').pop()
              })
            })
            ,
            shareReplay()
          )
      }
    }).onClose.subscribe(branch => {

      console.log(
        'loadControlData',
        branch
      );

      if (branch == false || branch == undefined) {
        this.setApplicationRef();
      } else {

        this.apiService.updateApplicationById(id, this.environment, {
          'remote': url,
          'branch': branch,
        }).subscribe(_ => {
          this.setApplicationRef();
        });

      }



    });
  }
  setApplicationRef() {
    this.application = this.apiService.getApplicationById(this.application_id).pipe(
      tap({
        next: (app) => {
          console.log('repositoryBranch', app)


          this.resetAllFormFields()

          let platform: Platform = app['platform']

          let config = {};

          if ('config' in app)

            if (this.environment == 'staging') {
              if ('staging' in app['config'])
                config = app['config']['staging']

            } else if (this.environment == 'development') {
              if ('development' in app['config'])
                config = app['config']['development']

            } else if (this.environment == 'production') {
              if ('production' in app['config'])
                config = app['config']['production']

            } else {

            }

          let appRef = undefined;

          console.log('repositoryBranch', config)




          appRef = config;

          if ('repository' in appRef) {

            let repository = appRef.repository;

            let remote = repository?.remote;
            let branch = repository?.branch;
            this.repository.setValue(remote)
            this.repositoryBranch.setValue(branch);
            console.log('repositoryBranch', branch)



          }



        }
      })
    )

  }

  createEngagement() {
    this.apiService.createSastEngagement(
      this.application_id, 
      Array.from(this.tags.values() )  ,
      this.changelogs.value ).subscribe()
  }
}
