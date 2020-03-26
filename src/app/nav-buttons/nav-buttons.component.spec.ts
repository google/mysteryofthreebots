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

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NavButtonsComponent } from './nav-buttons.component';
import { DialogService } from '../dialog.service';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { SolveDialogComponent } from '../solve-dialog/solve-dialog.component';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { HowDialogComponent } from '../how-dialog/how-dialog.component';

describe('NavButtonsComponent', () => {
  let component: NavButtonsComponent;
  let fixture: ComponentFixture<NavButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open notes dialog on clicking Police Notes button', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      const navButton = (
        Array.from(
          fixture.debugElement.nativeElement.querySelectorAll('.button')
        ) as HTMLButtonElement[]
      ).find((button: HTMLButtonElement) => {
          return button.innerText === 'Police Notes';
        });
      navButton.click();
      expect(dialogService.open).toHaveBeenCalledWith(NotesDialogComponent);
    }
  ));

  it('should open map dialog on clicking Map button', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      const navButton = (
        Array.from(
          fixture.debugElement.nativeElement.querySelectorAll('.button')
        ) as HTMLButtonElement[]
      ).find((button: HTMLButtonElement) => {
          return button.innerText === 'Map';
        });
      navButton.click();
      expect(dialogService.open).toHaveBeenCalledWith(MapDialogComponent);
    }
  ));

  it('should open solve dialog on clicking Solve button', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      const navButton = (
        Array.from(
          fixture.debugElement.nativeElement.querySelectorAll('.button')
        ) as HTMLButtonElement[]
      ).find((button: HTMLButtonElement) => {
          return button.innerText === 'Solve';
        });
      navButton.click();
      expect(dialogService.open).toHaveBeenCalledWith(SolveDialogComponent);
    }
  ));

  it('should open help dialog on clicking Help button', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      const navButton = (
        Array.from(
          fixture.debugElement.nativeElement.querySelectorAll('.button')
        ) as HTMLButtonElement[]
      ).find((button: HTMLButtonElement) => {
          return button.innerText === 'Help';
        });
      navButton.click();
      expect(dialogService.open).toHaveBeenCalledWith(HelpDialogComponent);
    }
  ));

  it('should open how dialog on clicking How? button', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      const navButton = (
        Array.from(
          fixture.debugElement.nativeElement.querySelectorAll('.button')
        ) as HTMLButtonElement[]
      ).find((button: HTMLButtonElement) => {
          return button.innerText === 'How?';
        });
      navButton.click();
      expect(dialogService.open).toHaveBeenCalledWith(HowDialogComponent);
    }
  ));
});
