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

import { Component, OnInit, ElementRef } from '@angular/core';
import { BotResponseService } from './bot-response.service';
import { DialogService } from './dialog.service';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'The Mystery of the Three Bots';

  constructor(
    private root: ElementRef,
    private botResponseService: BotResponseService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.botResponseService.loadModels().then(
      () => {
        // tslint:disable-next-line: no-console
        console.info('Finished loading models');
      }
    );
    const handleDialogClosed = () => {
      this.dialogService.open(HelpDialogComponent);
      this.root.nativeElement.removeEventListener('dialog-closed', handleDialogClosed, true);
    };
    this.dialogService.open(WelcomeDialogComponent);
    this.root.nativeElement.addEventListener('dialog-closed', handleDialogClosed, true);
  }

}
