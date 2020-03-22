/**
 *  Copyright 2020 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
