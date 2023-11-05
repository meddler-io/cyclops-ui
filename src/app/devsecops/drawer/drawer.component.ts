import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
  TemplateRef,
  OnInit,
  ElementRef
} from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { trigger } from '@angular/animations';

import { DRAWER_ANIMATION } from './drawer.animation';
import { DrawerDirection } from './drawer-direction.enum';
import { DrawerPosition } from './drawer-position.enum';
import { NbFocusTrap, NbFocusTrapFactoryService } from '@nebular/theme';
import { MediaChange, MediaObserver, ScreenTypes } from '@angular/flex-layout';

import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  exportAs: 'ngxDrawer',
  selector: 'ngx-drawer',
  templateUrl: 'drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [trigger('drawerTransition', DRAWER_ANIMATION)],
  host: {
    role: 'dialog',
    tabindex: '-1',
    '[class]': 'cssClasses',
    '[style.width]': 'widthSize',
    '[style.height]': 'heightSize',
    '[style.zIndex]': 'zIndex',
    '[style.position]': 'position',
    '[@drawerTransition]': 'direction'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() cssClass: string = '';
  @Input() direction: DrawerDirection;
  @Input() template: TemplateRef<any>;
  @Input() context: any;
  @Input() isRoot: boolean = true;

  @Input()
  get size() {
    return this._size;
  }
  set size(val: number | string) {
    this._size = coerceNumberProperty(val);
  }

  @Input()
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(val: number) {
    this._zIndex = coerceNumberProperty(val);
  }

  @Input()
  get closeOnOutsideClick() {
    return this._closeOnOutsideClick;
  }
  set closeOnOutsideClick(val: boolean) {
    this._closeOnOutsideClick = coerceBooleanProperty(val);
  }

  @Output() close = new EventEmitter<boolean>();

  get cssClasses(): string {
    let clz = `ngx-drawer ${this.cssClass}`;
    if (this.isLeft) clz += ' left-drawer';
    if (this.isBottom) clz += ' bottom-drawer';
    return clz;
  }

  widthSize: string | number;
  heightSize: string | number;
  position: DrawerPosition = DrawerPosition.fixed;

  private get isLeft(): boolean {
    return this.direction === DrawerDirection.Left;
  }

  private get isBottom(): boolean {
    return this.direction === DrawerDirection.Bottom;
  }

  private _size: number | string;
  private _zIndex: number;
  private _closeOnOutsideClick: boolean;

  protected focusTrap: NbFocusTrap;

  ngOnInit() {


    this.screenSizeChangeSubscription = this.mediaObserver.asObservable()

      .pipe(

        // tap(changes_ => {

        //   console.debug('changeALias', changes_,)

        // }),
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        // this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';



        if (change.mqAlias == 'xs') {
          this.widthSize = '100%'
        } else if (change.mqAlias == 'sm') {
          this.widthSize = '100%'
        } else if (change.mqAlias == 'md') {
          this.widthSize = '50%'
        } else if (change.mqAlias == 'lg') {
          this.widthSize = '50%'
        }
        else if (change.mqAlias == 'xl') {
          this.widthSize = '50%'
        }

        console.log('changeALias', change.mqAlias, this.widthSize)


      });



    this.position = this.isRoot ? DrawerPosition.fixed : DrawerPosition.absolute;
    this.setDimensions(this.size);


    // 
    {
      this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
      this.focusTrap.blurPreviouslyFocusedElement();
      this.focusTrap.focusInitialElementWhenReady();
    }
  }

  ngOnDestroy() {

    this.screenSizeChangeSubscription.unsubscribe()

    this.close.emit(true);

    // 

    if (this.focusTrap) {
      this.focusTrap.restoreFocus();

    }
  }

  setDimensions(size: number | string): void {
    this.heightSize = `${this.isBottom && size ? size : '100%'}`;

    if (size === 0)
      this.widthSize = `${this.isLeft && size ? size : '50%'}`;
    else
      this.widthSize = `${this.isLeft && size ? size : 'auto'}`;

    // this.widthSize = `auto`;
  }

  @HostListener('keyup.esc')
  onEscapeKey(): void {
    this.close.emit(true);
  }



  screenSizeChangeSubscription = Subscription.EMPTY

  constructor(
    protected elementRef: ElementRef,
    protected focusTrapFactory: NbFocusTrapFactoryService,
    public mediaObserver: MediaObserver
  ) {

  }


}
