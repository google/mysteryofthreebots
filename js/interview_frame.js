/**
Copyright 2020 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

export class InterviewFrame {
  constructor(root) {
    this.root = root;
    this.botName = this.root.dataset.botName;
    this.root.querySelector('.chat-container__frame__bot-name').textContent =
        this.botName;
    this.input_ = this.root
        .querySelector('.chat-container__frame__input');
    this.sendQuestionButton_ = this.root
        .querySelector('.chat-container__frame__send-question-button');
    this.messagesEl_ = this.root
        .querySelector('.chat-container__frame__messages');
    this.messageList_ = this.root.querySelector(
        '.chat-container__frame__message-list');
    this.root.querySelector('.chat-container__frame__form')
        .addEventListener('submit', (event) => {
      event.preventDefault();
      this.addMessage_(this.input_.value, true);
      this.input_.value = '';
      this.toggleSendQuestionButtonEnabled_()
    }, false);

    this.input_.addEventListener('input', () => {
      this.toggleSendQuestionButtonEnabled_();
    }, false);
  }

  addMessage_(message, isPlayer) {
    const div = document.getElementById('chat-message-template').content
        .cloneNode(true).firstElementChild;
    const msgText = document.createTextNode(message);
    const itemEl = document.createElement('li');
    div.firstElementChild.before(msgText);
    div.classList.add('chat-container__frame__message-list__message-text');
    itemEl.classList.add('chat-container__frame__message-list__message');
    if (isPlayer) {
      itemEl.classList.add(
          'chat-container__frame__message-list__message--player');
    }
    else {
      itemEl.classList.add(
          'chat-container__frame__message-list__message--bot');
    }
    itemEl.appendChild(div);
    this.messageList_.appendChild(itemEl);
    this.scrollToBottom_();

    if (isPlayer) {
      this.respondToMessage_(message);
    }
  }

  scrollToBottom_() {
    this.messagesEl_.scrollTop = this.messagesEl_.scrollHeight;
  }

  async respondToMessage_(message) {
    const model = await getModel();
    console.log(model);
    const response = `I don't understand "${message}"`;
    await new Promise((resolve) => setTimeout(resolve, 400));
    this.addMessage_(response, false);
  }

  toggleSendQuestionButtonEnabled_() {
    if (this.input_.value) {
      this.sendQuestionButton_.removeAttribute('disabled');
    }
    else {
      this.sendQuestionButton_.setAttribute('disabled', '');
    }
  }
}
