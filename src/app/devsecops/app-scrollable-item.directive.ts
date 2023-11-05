import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollableItem]'
})
export class AppScrollableItemDirective {

  @Input('appScrollableItem') public key: string
  constructor(private el: ElementRef<HTMLElement>) { }

  public scrollIntoView() {
    this.el.nativeElement.scrollIntoView({
      block: "start", inline: "nearest",
      behavior: 'smooth'});
    // this.el.nativeElement.scrollTo(0, 0);
  }

}