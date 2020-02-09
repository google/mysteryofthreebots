import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss'],
})
export class NavButtonsComponent {
  constructor(private readonly dialogService: DialogService) { }

  handleHelpClick() {
    this.dialogService.open('Help');
  }

  handleHowClick() {
    this.dialogService.open('How');
  }

  handleNotesClick() {
    this.dialogService.open('Notes');
  }

  handleMapClick() {
    this.dialogService.open('Map');
  }

  handleSolveClick() {
    this.dialogService.open('Solve');
  }
}
