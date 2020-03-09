import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-close-button',
  templateUrl: './dialog-close-button.component.html',
  styleUrls: ['./dialog-close-button.component.scss']
})
export class DialogCloseButtonComponent {
  @Input() buttonText = 'Close';

  constructor(private root: ElementRef) { }

  handleCloseClick() {
    this.root.nativeElement.dispatchEvent(new CustomEvent('close-dialog'));
  }
}
