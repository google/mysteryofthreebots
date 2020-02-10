import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.scss']
})
export class RadioListComponent {
  @Input() name: string;
  @Input() options: string[];

  constructor() { }
}
