import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { catchError, EMPTY, map, mergeMap, startWith, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-engagement-impact-step',
  templateUrl: './engagement-impact-step.component.html',
  styleUrls: ['./engagement-impact-step.component.scss']
})
export class EngagementImpactStepComponent {


  saving$ = false;


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
    private apiService: ApiService) { }
  ngOnInit(): void {

    this.stepDetails = this.loadDetails.asObservable().pipe(


      startWith(true),

      switchMap(
        _ => {

          return this.apiService.getImpactById(this.finding_id, this.step_id)

        }));


  }

  saveAttr(data) {


    this.saving$ = true;
    this.apiService.updateImpactToFinding(this.finding_id, this.step_id, data).subscribe(_ => {
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

        this.apiService.uploadToFinding(files[key], this.finding_id, this.step_id ,  attr , 'impact')
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
        this.downloadFile$( url ,  _?.filename )
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
}

