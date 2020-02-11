import { Component, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dialog-host',
  templateUrl: './dialog-host.component.html',
  styleUrls: ['./dialog-host.component.scss']
})
export class DialogHostComponent {
  @ViewChild('backdrop', {static: false}) backdrop: ElementRef;

  constructor(private readonly dialogService: DialogService) { }

  handleBackdropClick(event: any) {
    if (event.target === this.backdrop.nativeElement) {
      this.dialogService.close();
    }
  }
}
