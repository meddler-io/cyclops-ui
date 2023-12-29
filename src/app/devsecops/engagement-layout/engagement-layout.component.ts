import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from '../api.service';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-layout',
  templateUrl: './engagement-layout.component.html',
  styleUrls: ['./engagement-layout.component.scss']
})
export class EngagementLayoutComponent implements OnInit {

  engagementDetails = this.engagementService.activeEngagement.pipe(
    map(_=>_.engagement)
  )

  constructor(private apiService: ApiService,
    private engagementService: EngagementService,
    private activatedRoute: ActivatedRoute
    ) {

  }



  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      map(_=>_.get('id')),
      

    ).subscribe(_=>{
      console.log('console', _)
      this.engagementService.setActiveEngagementId(_ , this.apiService)
    })

  }



  findings$ = this.apiService.getAssessmentsFindings().pipe(

    map(_ => {


      return _.data
    }),

  )


}
