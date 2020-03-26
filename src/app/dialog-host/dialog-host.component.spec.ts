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

import { DialogHostComponent } from './dialog-host.component';
import { DialogService } from '../dialog.service';

describe('DialogHostComponent', () => {
  let component: DialogHostComponent;
  let fixture: ComponentFixture<DialogHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on clickng backdrop', inject(
    [DialogService],
    (dialogService: DialogService) => {
      spyOn(dialogService, 'close');
      fixture.debugElement.nativeElement.querySelector('.app-dialog-backdrop').click();
      expect(dialogService.close).toHaveBeenCalled();
    }
  ));
});
