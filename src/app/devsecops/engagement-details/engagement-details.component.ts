import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-engagement-details',
  templateUrl: './engagement-details.component.html',
  styleUrls: ['./engagement-details.component.scss']
})
export class EngagementDetailsComponent {

  engagementDetails = this.engagementService.activeEngagement.pipe(
    map(_=>_.engagement)
  )

  constructor(
    private engagementService: EngagementService,
    ) {

  }

}
