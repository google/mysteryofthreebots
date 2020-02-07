import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly renderer: Renderer2;
  private dialogHost?: HTMLElement;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: HTMLDocument
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  open(elementName: string) {
    if (!this.dialogHost) {
      this.dialogHost = this.document.getElementById('dialog-host');
    }
    const el = this.renderer.createElement(elementName);
    this.dialogHost.appendChild(el);
  }
}
