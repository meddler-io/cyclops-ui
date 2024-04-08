import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';
import { Observable, filter, map, switchMap, tap } from 'rxjs';
import { EngagementState } from 'src/environments/constants';

@Component({
  selector: 'app-next-action-screen',

  templateUrl: './next-action-screen.component.html',
  styleUrl: './next-action-screen.component.scss'
})
export class NextActionScreenComponent implements AfterViewInit {

  @ViewChild('draft') draftTemplate!: TemplateRef<any>;
  @ViewChild('open') openTemplate!: TemplateRef<any>;
  @ViewChild('in_progress') inProgressTemplate!: TemplateRef<any>;
  @ViewChild('pending_review') pendingReviewTemplate!: TemplateRef<any>;
  @ViewChild('under_review') underReviewTemplate!: TemplateRef<any>;
  @ViewChild('accepted') acceptedTemplate!: TemplateRef<any>;
  @ViewChild('rejected') rejectedTemplate!: TemplateRef<any>;
  @ViewChild('closed') closedTemplate!: TemplateRef<any>;


  getTemplate(state: string | undefined): TemplateRef<any> {
    if (state === 'draft') {
      return this.draftTemplate;
    } else if (state === 'open') {
      return this.openTemplate;
    } else if (state === 'in_progress') {
      return this.inProgressTemplate;
    } else if (state === 'pending_review') {
      return this.pendingReviewTemplate;
    } else if (state === 'under_review') {
      return this.underReviewTemplate;
    } else if (state === 'accepted') {
      return this.acceptedTemplate;
    } else if (state === 'rejected') {
      return this.rejectedTemplate;
    } else if (state === 'closed') {
      return this.closedTemplate;
    }
  }


  activeEngagement;



  constructor(
    private apiService: ApiService,
    private engagementService: EngagementService
  ) {

  }


  ngAfterViewInit(): void {
    this.activeEngagement = this.engagementService.activeEngagement

      .pipe(
        filter(_ => !!_)
        ,
        switchMap(_ => this.apiService.getOpenFindingsByAssessmentStats(_.id)
          .pipe(map(__ => { __.state = _.engagement.state; __.id = _.id; return __; }))

        )
        ,
        tap(_=>{
          console.log('console', _);
        })

      );
  }


  confirm(id, state: EngagementState) {
    console.log('confirm', id, state)

    let _sub: Observable<any>;
    if (state == EngagementState.DRAFT) {
      _sub = this.apiService.updateEngagementState(id, EngagementState.OPEN)
    } else if (state == EngagementState.OPEN) {
      _sub = this.apiService.updateEngagementState(id, EngagementState.IN_PROGRESS)
    }
    else if (state == EngagementState.IN_PROGRESS) {
      _sub = this.apiService.updateEngagementState(id, EngagementState.UNDER_REVIEW)
    }
    // else if (state == EngagementState.PENDING_REVIEW) {
    //   _sub = this.apiService.updateEngagementState(id, EngagementState.UNDER_REVIEW)
    // }
    else if (state == EngagementState.UNDER_REVIEW) {
      _sub = this.apiService.updateEngagementState(id, EngagementState.ACCEPTED)
    }


    _sub.subscribe(_ => {
      this.engagementService.setActiveEngagementId(id, this.apiService);
    });
  }

}
