import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent {
  constructor(private readonly dialogService: DialogService) { }

  handleHelpClick() {
    this.dialogService.open('app-help-dialog');
  }
}
