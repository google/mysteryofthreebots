import { Component, OnInit } from '@angular/core';
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
  title = 'mysterybot';

  constructor(
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
    this.dialogService.open(WelcomeDialogComponent);
  }
}
