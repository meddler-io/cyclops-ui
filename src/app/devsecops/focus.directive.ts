import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[focusOnce]'
})
export class FocusDirective implements AfterViewInit {

  // @Input('focus') focus: boolean;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2,
    // private readonly platform: PlatformService,
  ) { }

  ngAfterViewInit(): void {
    // if (!this.platform.isBrowser) {
    // return;
    // }

    this.elementRef.nativeElement.focus();
  }

}
