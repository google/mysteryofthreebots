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

import {InterviewFrame} from './interview_frame.js';
import {SolveDialog} from './solve_dialog.js';

function initFrame_(frameEl, frameTemplate) {
  const frame = frameTemplate.content.cloneNode(true);
  frameEl.appendChild(frame);
  new InterviewFrame(frameEl);
}

function init_() {
  const main = document.getElementById('main');
  const frameTemplate = main.querySelector('.templates__chat-frame');

  Array.from(main.querySelectorAll('.chat-container__frame'))
      .forEach((el) => initFrame_(el, frameTemplate));

  const navButtonsEl = main.querySelector('.nav-buttons');
  const dialogHost = document.querySelector('.dialog-host');
  new SolveDialog(dialogHost.querySelector('.dialog.solve'));

  dialogHost.addEventListener('click', (event) => {
    if (event.target.classList.contains('dialog')) {
      event.target.classList.remove('open');
      return;
    }

    if (event.target.dataset.dialogAction === 'close') {
      event.target.closest('.dialog').classList.remove('open');
      return;
    }
  }, true);

  navButtonsEl.addEventListener('click', (event) => {
    if (!event.target.classList.contains('nav-buttons__button')) {
      return;
    }

    const to = event.target.dataset.to;
    const targetDialog = dialogHost.querySelector(`.dialog.${to}`);
    if (!targetDialog) {
      console.error(`Unknown dialog ${to}`);
      return;
    }

    for (const dialog of dialogHost.querySelectorAll('.dialog')) {
      dialog.classList.toggle('open', dialog === targetDialog);
    }
  }, false);
}

if (document.readyState === 'complete') {
  init_();
}
else {
  document.addEventListener('DOMContentLoaded', () => {
    init_();
  });
}
