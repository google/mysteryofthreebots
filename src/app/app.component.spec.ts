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

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { DialogHostComponent } from './dialog-host/dialog-host.component';
import { HomeComponent } from './home/home.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { ChatComponent } from './chat/chat.component';
import { InterviewPaneComponent } from './interview-pane/interview-pane.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { HowDialogComponent } from './how-dialog/how-dialog.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { SolveDialogComponent } from './solve-dialog/solve-dialog.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { IncompleteSolutionDialogComponent } from './incomplete-solution-dialog/incomplete-solution-dialog.component';
import { IncorrectSolutionDialogComponent } from './incorrect-solution-dialog/incorrect-solution-dialog.component';
import { BotResponseService } from './bot-response.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        DialogHostComponent,
        HomeComponent,
        NavButtonsComponent,
        ChatComponent,
        InterviewPaneComponent,
        DialogCloseButtonComponent,
        HelpDialogComponent,
        HowDialogComponent,
        NotesDialogComponent,
        MapDialogComponent,
        SolveDialogComponent,
        WinDialogComponent,
        IncompleteSolutionDialogComponent,
        IncorrectSolutionDialogComponent,
        WelcomeDialogComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    }).overrideModule(
      BrowserDynamicTestingModule,
      {
        set: {
          entryComponents: [
            HelpDialogComponent,
            HowDialogComponent,
            NotesDialogComponent,
            MapDialogComponent,
            SolveDialogComponent,
            WinDialogComponent,
            IncompleteSolutionDialogComponent,
            IncorrectSolutionDialogComponent,
            WelcomeDialogComponent,
          ],
        },
      }
    ).compileComponents();
  }));

  afterEach(() => {
    fixture.debugElement.nativeElement.remove();
    fixture.destroy();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'The Mystery of the Three Bots'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('The Mystery of the Three Bots');
  });

  it('should load the models', inject([BotResponseService], (responseService: BotResponseService) => {
    spyOn(responseService, 'loadModels').and.callThrough();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(responseService.loadModels).toHaveBeenCalled();
  }));

  it('should initialize state', inject([BotResponseService], (responseService: BotResponseService) => {
    spyOn(responseService, 'setState').and.callThrough();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(responseService.setState).toHaveBeenCalledWith({
      chef: 'initial',
    });
  }));
});
