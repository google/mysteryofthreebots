import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {

  constructor(private root: ElementRef) { }

  handleContinueClick() {
    this.root.nativeElement.dispatchEvent(new CustomEvent('close-dialog'));
  }
}
