import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  ComponentRef,
  EventEmitter
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { HowDialogComponent } from './how-dialog/how-dialog.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { SolveDialogComponent } from './solve-dialog/solve-dialog.component';

export type DialogId = 'Help'|'How'|'Notes'|'Map'|'Solve';

const DIALOG_COMPONENTS: {[id in DialogId]: new () => {}} = {
  Help: HelpDialogComponent,
  How: HowDialogComponent,
  Notes: NotesDialogComponent,
  Map: MapDialogComponent,
  Solve: SolveDialogComponent,
};

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly renderer: Renderer2;
  private dialog: HTMLElement;
  private backdrop: HTMLElement;

  private readonly componentsById: {[id in DialogId]: ComponentRef<any>} = {
    Help: null,
    How: null,
    Notes: null,
    Map: null,
    Solve: null,
  };

  constructor(
    rendererFactory: RendererFactory2,
    private readonly resolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly appRef: ApplicationRef,
    @Inject(DOCUMENT) private readonly document: HTMLDocument
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  open(component: DialogId) {
    let componentRef = this.componentsById[component];
    if (!componentRef) {
      const componentFactory = this.resolver.resolveComponentFactory(DIALOG_COMPONENTS[component]);
      componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);
      const closeDialog = (componentRef.instance as any).closeDialog;
      if (closeDialog && closeDialog instanceof EventEmitter) {
        (closeDialog as EventEmitter<void>).subscribe(() => {
          this.close();
        });
      }
    }
    if (!this.backdrop) {
      this.backdrop = this.document.getElementById('app-dialog-backdrop');
    }
    if (!this.dialog) {
      this.dialog = this.document.getElementById('app-dialog');
    }
    this.renderer.addClass(this.backdrop, 'is-open');
    this.dialog.innerHTML = '';
    this.renderer.appendChild(this.dialog, (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
  }

  close() {
    if (!this.backdrop) {
      return;
    }
    this.renderer.removeClass(this.backdrop, 'is-open');
  }
}
