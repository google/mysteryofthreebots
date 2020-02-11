import { Component, Input, HostBinding, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { BotResponseService, BotName } from '../bot-response.service';

interface IMessage {
  text: string;
  isPlayer: boolean;
  isWaiting?: boolean;
}

@Component({
  selector: 'app-interview-pane',
  templateUrl: './interview-pane.component.html',
  styleUrls: ['./interview-pane.component.scss']
})
export class InterviewPaneComponent implements AfterViewChecked {
  @ViewChild('messageContainer', {static: false}) private scrollContainer: ElementRef;
  @HostBinding('attr.data-bot-name') @Input() botName: BotName;
  question = '';
  messages: IMessage[] = [];
  private shouldScroll = false;

  constructor(private botResponseService: BotResponseService) { }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  handleQuestionSubmit(event: any) {
    event.preventDefault();
    this.messages.push({
      text: this.question,
      isPlayer: true,
    });
    const question = this.question;
    this.question = '';
    this.messages.push({
      text: '',
      isPlayer: false,
      isWaiting: true,
    });
    this.scrollToBottom();
    setTimeout(async () => {
      let response = await this.botResponseService.getResponse(question, this.botName);
      if (!response) {
        response = 'I\'m sorry, I didn\'t understand that. Can you ask that another way?';
      }
      const pendingMessage =  this.messages.find(({isWaiting, isPlayer}) => !isPlayer && isWaiting);
      if (pendingMessage) {
        pendingMessage.text = response;
        pendingMessage.isWaiting = false;
      } else {
        this.messages.push({
          text: response,
          isPlayer: false,
        });
        this.scrollToBottom();
      }
    }, 0);
  }

  handleQuestionInput(event: any) {
    this.question = event.target.value;
  }

  private scrollToBottom() {
    this.shouldScroll = true;
  }
}
