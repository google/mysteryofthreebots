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

import { Component, Input, HostBinding, ElementRef, ViewChild, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { BotResponseService, BotName } from '../bot-response.service';

interface IMessage {
  text: string;
  isPlayer: boolean;
  isWaiting?: boolean;
}

let arePassiveListenersSupported = false;

try {
  window.addEventListener('test', null,
    Object.defineProperty(
      {},
      'passive',
      {
        get() {
          arePassiveListenersSupported = true;
        }
      }
    )
  );
} catch (err) {}

@Component({
  selector: 'app-interview-pane',
  templateUrl: './interview-pane.component.html',
  styleUrls: ['./interview-pane.component.scss']
})
export class InterviewPaneComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  @ViewChild('messageContainer', {static: false}) private scrollContainer: ElementRef;
  @HostBinding('attr.data-bot-name') @Input() botName: BotName;
  question = '';
  messages: IMessage[] = [];
  private shouldScroll = false;

  constructor(private botResponseService: BotResponseService) {
    this.handleScroll = this.handleScroll.bind(this);
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      setTimeout(() => {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        this.toggleScrollClasses();
      }, 0);
      this.shouldScroll = false;
    }
  }

  ngAfterViewInit() {
    this.scrollContainer.nativeElement.addEventListener(
      'scroll',
      this.handleScroll,
      arePassiveListenersSupported ?
        {
          passive: true,
        } :
        false
    );
  }

  ngOnDestroy() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll() {
    this.toggleScrollClasses();
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

  private toggleScrollClasses() {
    this.scrollContainer.nativeElement.classList.toggle(
      'at-top',
      this.scrollContainer.nativeElement.scrollTop === 0
    );
    this.scrollContainer.nativeElement.classList.toggle(
      'at-bottom',
      this.scrollContainer.nativeElement.scrollTop +
        this.scrollContainer.nativeElement.clientHeight >= this.scrollContainer.nativeElement.scrollHeight
    );
  }
}
