import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';
import { EngagementState } from 'src/environments/constants';

@Component({
  selector: 'app-engagement-layout',
  templateUrl: './engagement-layout.component.html',
  styleUrls: ['./engagement-layout.component.scss']
})
export class EngagementLayoutComponent implements OnInit {

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  tabs = [
    ['Details' , ['details'] , [ EngagementState.ACCEPTED , EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS  , EngagementState.OPEN , EngagementState.PENDING_REVIEW , EngagementState.REJECTED, EngagementState.UNDER_REVIEW  ]  ],
    ['Draft' , ['in_progress'], [ EngagementState.ACCEPTED , EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS  , EngagementState.OPEN , EngagementState.PENDING_REVIEW , EngagementState.REJECTED, EngagementState.UNDER_REVIEW  ]  ],

    ['Assign' , ['assign_task'], [ EngagementState.OPEN   ] ],




    ['Findings' , ['in_progress'], [ EngagementState.ACCEPTED , EngagementState.ARCHIVED, EngagementState.CLOSED, EngagementState.DRAFT, EngagementState.IN_PROGRESS  , EngagementState.OPEN , EngagementState.PENDING_REVIEW , EngagementState.REJECTED, EngagementState.UNDER_REVIEW  ]  ],
    
    ['Review', ['draft_review'], [ EngagementState.UNDER_REVIEW   ] ], // List of all vulnerabilities
    ['Home' , ['manage'] , [ EngagementState.UNDER_REVIEW   ] ],





  ]

  engagementDetails = this.engagementService.activeEngagement.pipe(
    map(_ => _.engagement),
    tap(_ => {
      let state: EngagementState = _?.state;
      console.log('debugger',state)
    })
  )

  constructor(private apiService: ApiService,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute
  ) {

  }



  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      map(_ => _.get('id')),


    ).subscribe(_ => {
      console.log('console', _)
      this.engagementService.setActiveEngagementId(_, this.apiService)
    })

  }



  findings$ = this.apiService.getAssessmentsFindings().pipe(

    map(_ => {


      return _.data
    }),

  )


}
