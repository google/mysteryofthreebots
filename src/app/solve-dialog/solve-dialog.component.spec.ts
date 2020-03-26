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

import { SolveDialogComponent } from './solve-dialog.component';
import { DialogCloseButtonComponent } from '../dialog-close-button/dialog-close-button.component';
import { RadioListComponent } from '../radio-list/radio-list.component';
import { DialogService } from '../dialog.service';
import { By } from '@angular/platform-browser';
import { IncompleteSolutionDialogComponent } from '../incomplete-solution-dialog/incomplete-solution-dialog.component';
import { IncorrectSolutionDialogComponent } from '../incorrect-solution-dialog/incorrect-solution-dialog.component';
import { WinDialogComponent } from '../win-dialog/win-dialog.component';

describe('SolveDialogComponent', () => {
  let component: SolveDialogComponent;
  let fixture: ComponentFixture<SolveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SolveDialogComponent,
        DialogCloseButtonComponent,
        RadioListComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open incomplete solution dialog', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Mrs. Bluejay"]')
      ).nativeElement.click();
      fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
      expect(dialogService.open).toHaveBeenCalledWith(IncompleteSolutionDialogComponent);
    }
  ));

  it('should open incorrect solution dialog', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Mrs. Bluejay"]')
      ).nativeElement.click();
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Living Room"]')
      ).nativeElement.click();
      fixture.debugElement.query(
        By.css('input[type="radio"][value="A Hollow Bible"]')
      ).nativeElement.click();
      fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
      expect(dialogService.open).toHaveBeenCalledWith(IncorrectSolutionDialogComponent);
    }
  ));

  it('should open win dialog', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'open');
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Professor Pluot"]')
      ).nativeElement.click();
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Living Room"]')
      ).nativeElement.click();
      fixture.debugElement.query(
        By.css('input[type="radio"][value="A Hollow Bible"]')
      ).nativeElement.click();
      fixture.debugElement.query(By.css('.submit-button')).nativeElement.click();
      expect(dialogService.open).toHaveBeenCalledWith(WinDialogComponent);
    }
  ));

  it('should close the dialog when "No" button is clicked', inject(
    [DialogService],
    async (dialogService: DialogService) => {
      let resetCalled = false;
      fixture.debugElement.nativeElement.addEventListener('reset', () => {
        resetCalled = true;
      });
      spyOn(dialogService, 'close');
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Professor Pluot"]')
      ).nativeElement.click();
      fixture.debugElement.query(
        By.css('input[type="radio"][value="Living Room"]')
      ).nativeElement.click();
      fixture.debugElement.query(
        By.css('input[type="radio"][value="A Hollow Bible"]')
      ).nativeElement.click();
      fixture.debugElement.query(By.css('.cancel-button')).nativeElement.click();
      expect(dialogService.close).toHaveBeenCalled();
      expect(resetCalled).toBe(true);
    }
  ));
});
