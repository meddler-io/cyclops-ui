import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {


  @Input('page_number') page_number = 0;
  @Input('page_count') page_count = 10;
  @Input('page_size') page_size = 20;

  @Input('loading') loading = false;

  goto(page){

  }

  

}
