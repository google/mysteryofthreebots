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
  title = 'mysterybot';

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
