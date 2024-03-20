import { Component, ComponentRef, Injectable, Injector, OnInit, TemplateRef } from '@angular/core';
import { NbComponentPortal, NbComponentType, NbWindowComponent, NbWindowConfig, NbWindowRef, NbWindowsContainerComponent, NbWindowService, NB_WINDOW_CONTENT, NB_WINDOW_CONTEXT, NbWindowState } from '@nebular/theme';
import { first, of, tap } from 'rxjs';

@Component({
  selector: 'nb-window-2',
  styles: [



    `
    .ngx-drawer {
      position: fixed;
      // height: 100vh;
      height: 100%;
    }

    nb-overlay-container{
      height: 100%;
    }
    
    `
  ],
  templateUrl: './new-sidebar.service.html'


  // styleUrls: ['./window.component.scss'],
})
export class CustomContainerComponent extends NbWindowComponent implements OnInit {


  windowRef: NbWindowRef;

  ngOnInit(): void {

    console.log('windowRefwindowRef', this.windowRef, this.elementRef)
  }


  //   <nb-card>
  //   <nb-card-header>
  //   Help

  //   </nb-card-header>
  //   <nb-card-body >
  //     <nb-overlay-container></nb-overlay-container>
  //   </nb-card-body>
  // </nb-card>
}

@Injectable({
  providedIn: 'root'
})
export class NewSidebarService extends NbWindowService {

  previous_stacked_window: any[][] = [];



  closeAll() {
    console.log('clisngwindows', this.openWindows.length)



    for (let i = this.openWindows.length - 1; i >= 0; i--)
      this.openWindows[i].close()

  }


  counter = 0;
  __open(windowContent: TemplateRef<any> | NbComponentType, windowConfig?: Partial<NbWindowConfig>) {



    this.previous_stacked_window.push([windowContent, windowConfig, this.counter]);

    if (this.previous_stacked_window.length > 0) {

    } else {

    }

    let windowRef = super.open(
      windowContent, windowConfig
    );

    console.log('stackstack', this.previous_stacked_window, this.previous_stacked_window.length)

    // if (stack) 
    {



      windowRef.onClose.pipe(
        tap(_ => {

          this.counter -= 1;

          if (this.previous_stacked_window.length > 1) {


            console.log('stackstack_onclose_1', this.previous_stacked_window.length);
            let args = this.previous_stacked_window.pop()
            super.open(args[0], args[1]);


          } else {
            console.log('stackstack_onclose_2', this.previous_stacked_window.length);

          }
        })

      ).subscribe();





    }

    this.previous_stacked_window.push([windowContent, windowConfig, this.counter]);


    return windowRef;

  }


  windowsRefrencesByNames = new Map<string, NbWindowRef>


  closeById(windowId) {
    if (this.windowsRefrencesByNames.has(windowId)) {
      this.windowsRefrencesByNames.get(windowId).close();
      this.windowsRefrencesByNames.delete(windowId);
    }
  }

  open(windowContent: TemplateRef<any> | NbComponentType, windowConfig?: Partial<NbWindowConfig>) {




    windowConfig = { ...windowConfig }

    windowConfig.closeOnBackdropClick = false;
    windowConfig.closeOnEsc = false;
    // windowConfig.initialState = NbWindowState.MINIMIZED;

    console.log('windowConfigwindowConfig', windowConfig.context)

    let attachBackdropHandler = this.shouldCreateWindowsContainer();

    console.log(
      'qsnans', this.shouldCreateWindowsContainer())
    // windowConfig.initialState = NbWindowState.MINIMIZED

    this.counter += 1;


    // this.createWindowsContainer()


    let windowId = (Date.now().toString());
    console.log('created window_id', windowId)


    if (windowConfig.context)
      windowConfig.context['window_id'] = windowId;
    else
      windowConfig.context = {
        window_id: windowId
      }


    const windowRef = super.open(
      windowContent, windowConfig
    );

    this.windowsRefrencesByNames.set(windowId, windowRef);




    // windowConfig.context['ref'] = of('prakhar');




    console.log('windowRef', windowRef.componentRef, windowRef.componentRef.instance)


    if (attachBackdropHandler) {

      this.overlayRef.backdropClick().subscribe(_ => {
        console.log('stackstack', 'bacdrop', this.openWindows);
        if (this.openWindows.length > 0)
          this.openWindows[this.openWindows.length - 1].close();

      })
    }


    // this.overlayRef = this.overlayService.create();



    // if (attachBackdropHandler) 
    // {
    //   this.overlayRef.backdropElement.onclick = (_) => {
    //     console.log('qsnans', 'backdro', this.overlayRef);
    //     windowRef.close()


    //   }
    // }








    // windowConfig.closeOnBackdropClick = false;
    // windowConfig.closeOnEsc = false;

    // (windowRef.componentInstance as NbWindowComponent).overlayContainer




    this.previous_stacked_window.push([windowContent, windowConfig, windowRef]);


    return windowRef;

  }

  protected appendWindow(
    content: TemplateRef<any> | NbComponentType,
    config: NbWindowConfig,
    windowRef: NbWindowRef,
  ): ComponentRef<NbWindowComponent> {
    const context = content instanceof TemplateRef ? { $implicit: config.context, windowRef } : config.context;



    const providers = [
      { provide: NB_WINDOW_CONTENT, useValue: content },
      { provide: NB_WINDOW_CONTEXT, useValue: context },
      { provide: NbWindowConfig, useValue: config },
      { provide: NbWindowRef, useValue: windowRef },
    ];
    const parentInjector = config.viewContainerRef
      ? config.viewContainerRef.injector
      : this.windowsContainerViewRef.injector;
    const injector = Injector.create({ parent: parentInjector, providers });
    const windowFactory = this.componentFactoryResolver.resolveComponentFactory(CustomContainerComponent);

    const ref = this.windowsContainerViewRef.createComponent(
      windowFactory,
      this.windowsContainerViewRef.length,
      injector,
    );
    ref.instance.cfr = this.cfr;
    ref.changeDetectorRef.detectChanges();
    return ref;
  }





}
