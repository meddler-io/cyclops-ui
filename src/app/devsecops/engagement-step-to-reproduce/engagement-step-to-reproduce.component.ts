import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbMenuService, NbSidebarService } from '@nebular/theme';
import { catchError, EMPTY, filter, map, mergeMap, startWith, Subject, switchMap, tap } from 'rxjs';
import { NewSidebarService } from 'src/app/new-sidebar.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { DrawerDirection } from '../drawer/drawer-direction.enum';
import { DrawerService } from '../drawer/drawer.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-engagement-step-to-reproduce',
  templateUrl: './engagement-step-to-reproduce.component.html',
  styleUrls: ['./engagement-step-to-reproduce.component.scss']
})
export class EngagementStepToReproduceComponent implements OnInit, AfterViewInit {
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];



  current_tab = 'images'

  switch_tab(tab) {
    this.current_tab = tab;
  }

  more_actions = [
    { title: 'Edit' },
    { title: 'Delete' },
  ]
  saving$ = false;

  @Input() content = ''
  @Input() title = ''



  @ViewChild('template') templateRef;
  @ViewChild('stepEditorTemplate') stepEditorTemplate;





  @Input('finding_id') finding_id;
  @Input('step_id') step_id;
  @Input('index') index;


  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }


  stepDetails;

  loadDetails = new Subject()


  markdownText = ''
  hidePreview(e) { console.log(e.getContent()); };
  public files: Set<File> = new Set()


  constructor(
    private nbMenuService: NbMenuService,
    private apiService: ApiService
    ,
    private drawerMngr: DrawerService,

    private dialogService: NbDialogService,

    private windowService: NewSidebarService,




  ) { }
  ngAfterViewInit(): void {
    // console.log('nb-window-2', this.index)
    // this.openDialog(this.stepEditorTemplate)
  }
  ngOnInit(): void {




    this.stepDetails = this.loadDetails.asObservable().pipe(


      startWith(true),

      switchMap(
        _ => {

          return this.apiService.getStepToFinding(this.finding_id, this.step_id).pipe(

            tap(_ => {
              console.log('___', _);
              this.title = _?.title;
              this.content = _?.description;


            })
          )

        }));


  }

  saveAttr(data) {


    this.saving$ = true;
    this.apiService.updateStepToFinding(this.finding_id, this.step_id, data).subscribe(_ => {
      this.saving$ = false;

      this.loadDetails.next(true);

    })
  }

  images = [


  ]

  // File Artifact data
  fileArtifact: { path: string, filename: string, bucket: string } = {
    path: '',
    filename: '',
    bucket: ''
  }

  // @ViewChild("file") file;

  onFilesAdded(elementRef, attr) {



    const files: { [key: string]: File } = elementRef.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);

        this.apiService.uploadToFinding(files[key], this.finding_id, this.step_id, attr, 'step')
          .pipe(mergeMap(_ => _))
          .pipe(
          // mergeMap(_ => {

          //   return this.apiService.updateApplicationById(id, this.environment, {
          //     file: _['data']
          //   })

          // })
        )
          .pipe(
            catchError((err, exc) => {

              return EMPTY;
            }),
          )
          .subscribe(
            {
              next: (data) => {




              },

              error: (err) => console.log("BOOBOO", err),
              complete: () => this.loadDetails.next(true),

            }






          );
      }
    }
  }


  downloadFile(file) {
    this.apiService.downloadFileDirectly(file).subscribe(
      _ => {

        let url = environment.minio_url + _?.url;
        this.downloadFile$(url, _?.filename)
      }
    );
  }

  downloadFile$(url: string, filename: string): void {
    // Make a request to get the file data
    // Create an anchor element
    const anchor = document.createElement('a');

    // Set attributes for the anchor element
    anchor.href = url;
    anchor.download = filename;

    // Trigger a click on the anchor element to start the download
    anchor.click();

    // Clean up by removing the anchor element
    anchor.remove();
  }


  // 

  openDrawer(context, template, direction = 'left', size?, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {
    this.drawerMngr.create({
      direction: DrawerDirection.Left,
      template,
      size,
      context: { finding_id: context?._id },
      closeOnOutsideClick,
      parentContainer,
      isRoot
    });
  }

  openDialog(dialog: TemplateRef<any>) {

    this.windowService.open(dialog);
    return
    // this.openDrawer({}, dialog);



    this.dialogService.open(dialog, {

      dialogClass: 'dialogClass',
      backdropClass: 'blurBackdrop',
      context: {

      }
    }).onClose.subscribe(_ => {



    });
  }

  addStep() {

  }

  editStep(step_id) {

  }
}
