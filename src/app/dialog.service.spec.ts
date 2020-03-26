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

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DialogService } from './dialog.service';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { DialogHostComponent } from './dialog-host/dialog-host.component';

describe('DialogService', () => {
  let fixture: ComponentFixture<DialogHostComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogHostComponent,
        WelcomeDialogComponent,
        DialogCloseButtonComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          WelcomeDialogComponent,
        ],
      },
    });
    fixture = TestBed.createComponent(DialogHostComponent);
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.debugElement.nativeElement.remove();
  });

  it('should be created', () => {
    const service: DialogService = TestBed.get(DialogService);
    expect(service).toBeTruthy();
  });

  it('should create a dialog element when opened', () => {
    const service: DialogService = TestBed.get(DialogService);
    service.open(WelcomeDialogComponent);
    expect(fixture.debugElement.nativeElement.contains(document.getElementById('app-dialog'))).toBeTruthy();
    const backdrop = fixture.debugElement.nativeElement.querySelector('.app-dialog-backdrop');
    expect(backdrop.classList.contains('is-open')).toBeTruthy();
  });

  it('should close the dialog on clicking the backdrop', () => {
    const service: DialogService = TestBed.get(DialogService);
    service.open(WelcomeDialogComponent);
    const backdrop = fixture.debugElement.nativeElement.querySelector('.app-dialog-backdrop');
    expect(backdrop.classList.contains('is-open')).toBeTruthy();
    backdrop.click();
    expect(backdrop.classList.contains('is-open')).toBeFalsy();
  });
});
