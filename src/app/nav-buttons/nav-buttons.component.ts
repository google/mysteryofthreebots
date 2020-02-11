import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { HowDialogComponent } from '../how-dialog/how-dialog.component';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { SolveDialogComponent } from '../solve-dialog/solve-dialog.component';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss'],
})
export class NavButtonsComponent {
  constructor(private readonly dialogService: DialogService) { }

  handleHelpClick() {
    this.dialogService.open(HelpDialogComponent);
  }

  handleHowClick() {
    this.dialogService.open(HowDialogComponent);
  }

  handleNotesClick() {
    this.dialogService.open(NotesDialogComponent);
  }

  handleMapClick() {
    this.dialogService.open(MapDialogComponent);
  }

  handleSolveClick() {
    this.dialogService.open(SolveDialogComponent);
  }
}
