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
import { IncompleteSolutionDialogComponent } from '../incomplete-solution-dialog/incomplete-solution-dialog.component';
import { WinDialogComponent } from '../win-dialog/win-dialog.component';
import { IncorrectSolutionDialogComponent } from '../incorrect-solution-dialog/incorrect-solution-dialog.component';

@Component({
  selector: 'app-solve-dialog',
  templateUrl: './solve-dialog.component.html',
  styleUrls: ['./solve-dialog.component.scss']
})
export class SolveDialogComponent {
  readonly whoOptions = [
    'Miss Red',
    'Professor Pluot',
    'Mrs. Bluejay',
    'Reverend Grass',
    'Colonel Gold',
    'Mrs. Eggshell',
  ];

  readonly roomOptions = [
    'Living Room',
    'Office',
    'Dining Room',
    'Study',
    'Kitchen',
  ];

  readonly containerOptions = [
    'A Flour Jar',
    'A Safe',
    'A Hollow Bible',
    'A Gravy Boat',
  ];

  constructor(private readonly dialogService: DialogService) { }

  handleSubmit(event: any) {
    event.preventDefault();
    this.checkSolution(event.target);
  }

  checkSolution(form: HTMLFormElement) {
    const {who, room, container} = this.getFormData(form);
    if (!who || !room || !container) {
      this.dialogService.open(IncompleteSolutionDialogComponent);
    } else if (
      who === 'Professor Pluot' &&
      room === 'Living Room' &&
      container === 'A Hollow Bible'
    ) {
      this.dialogService.open(WinDialogComponent);
    } else {
      this.dialogService.open(IncorrectSolutionDialogComponent);
    }
  }

  getFormData(form: HTMLFormElement) {
    const who = form.querySelector('[name="who"]:checked') as HTMLInputElement;
    const room = form.querySelector('[name="what-room"]:checked') as HTMLInputElement;
    const container = form.querySelector('[name="what-container"]:checked') as HTMLInputElement;

    return {
      who: who ?
          who.value :
          undefined,
      room: room ?
          room.value :
          undefined,
      container: container ?
          container.value :
          undefined,
    };
  }

  handleNoButtonClick() {
    this.dialogService.close();
  }
}
