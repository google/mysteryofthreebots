import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-interview-pane',
  templateUrl: './interview-pane.component.html',
  styleUrls: ['./interview-pane.component.scss']
})
export class InterviewPaneComponent implements OnInit {
  @HostBinding('attr.data-bot-name') @Input() botName: string;
  question: string;

  constructor() { }

  ngOnInit() {
  }

  handleQuestionSubmit(event: any) {
    event.preventDefault();
  }

  handleQuestionInput(event: any) {
    this.question = event.target.value;
  }
}
