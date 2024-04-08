import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';
import { EngagementState } from 'src/environments/constants';
import { NbContextMenuDirective, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-engagement-layout',
  templateUrl: './engagement-layout.component.html',
  styleUrls: ['./engagement-layout.component.scss']
  
})
export class EngagementLayoutComponent implements OnInit {

  tabs$ = [

    // Testing phase routes
    ['Test', ['test'], [EngagementState.DRAFT, EngagementState.OPEN, EngagementState.IN_PROGRESS,  EngagementState.UNDER_REVIEW, EngagementState.ACCEPTED, EngagementState.REJECTED, EngagementState.CLOSED, EngagementState.ARCHIVED]],

    
    ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],
    ['Draft', ['draft_review'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


    ['Assign', ['assign_task'], [EngagementState.OPEN]],




    ['Findings', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

    ['Review', ['review'], [EngagementState.UNDER_REVIEW]], // List of all vulnerabilities
    ['Home', ['manage'], [EngagementState.UNDER_REVIEW]],


  ]


  tabs = []
  activeTabBasedOnState = (state: EngagementState): any[] => {

    let tabs = []

    switch (state) {
      case EngagementState.DRAFT:
        tabs = [['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],
        ['Draft', ['draft_review'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],
        ]
        break;


      case EngagementState.OPEN:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],
          ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Review Findings', ['findings_under_review'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

        ]
        break;

      case EngagementState.IN_PROGRESS:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


          // ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Revalidation', ['draft_review'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          ['Engagement', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


        ]
        break;



      case EngagementState.UNDER_REVIEW:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],
          ['Revalidation', ['draft_review'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          // ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Findings', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


        ]
        break;
      case EngagementState.ACCEPTED:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          // ['Draft', ['draft_review'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          // ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Findings', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],
          ['Summary', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],



        ]
        break;

      case EngagementState.REJECTED:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Findings', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


        ]
        break;

      case EngagementState.CLOSED:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Findings', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


        ]
        break;

      case EngagementState.ARCHIVED:
        tabs = [
          ['Details', ['details'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],

          ['Assign', ['assign_task'], [EngagementState.OPEN]],
          ['Findings', ['in_progress'], [EngagementState.ACCEPTED, EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS, EngagementState.OPEN,  EngagementState.REJECTED, EngagementState.UNDER_REVIEW]],


        ]
        break;

      default:

        tabs = []
        break;


    }

    tabs = [this.tabs$[0]].concat(tabs)
    return tabs;
  }




  next_step_title: Record<EngagementState, string> = {

    [EngagementState.DRAFT]: 'Open',
    [EngagementState.OPEN]: 'Initiate',
    [EngagementState.IN_PROGRESS]: 'Publish',
    // [EngagementState.PENDING_REVIEW]: 'Review',
    [EngagementState.UNDER_REVIEW]: 'Accept',
    [EngagementState.ACCEPTED]: 'Close',
    [EngagementState.REJECTED]: 'Close',
    [EngagementState.CLOSED]: 'Archive',
    [EngagementState.ARCHIVED]: 'No Action',
  }


  // 
  engagementDetails = this.engagementService.activeEngagement.pipe(
    filter(_ => !!_),
    map(_ => _.engagement),
    switchMap(_ => {

      let state: EngagementState = _?.state;
      console.log('debugger', state);
      let tabs = this.activeTabBasedOnState(state);
      this.tabs = tabs;


      // return;

      return this.activatedRoute.firstChild.url.pipe(map(segments => {
        const lastSegment = segments[segments.length - 1]; // Get the last segment
        let checkAuth = this.tabs.filter((v) => {
          return v[1].includes(lastSegment.path)
        })

        if (checkAuth.length == 0) {
          this.router.navigate(tabs[tabs.length - 1][1], {
            relativeTo: this.activatedRoute
          })
        }

        console.log('lastSegment', checkAuth, lastSegment.path); // Output the last segment's path
        return _;

      })
      );

      // Auto swithc to route
      return;


    })
  )

  constructor(private apiService: ApiService,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,

    private router: Router,
    private dialogService: NbDialogService
  ) {

  }

  



  ngOnInit(): void {


    this.activatedRoute.paramMap.pipe(
      map(_ => _.get('id')),


    ).subscribe(_ => {
      console.log('console', _)
      this.engagementService.setActiveEngagementId(_, this.apiService);




      // 



    });


  }






  nextAction(template) {

    this.dialogService.open(
      template
    )

  }


}
