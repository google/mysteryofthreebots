import { Component, OnInit } from '@angular/core';
import { BotResponseService } from './bot-response.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mysterybot';

  constructor(private botResponseService: BotResponseService) {}

  ngOnInit() {
    this.botResponseService.loadModels().then(
      () => {
        // tslint:disable-next-line: no-console
        console.info('Finished loading models');
      }
    );
  }
}
