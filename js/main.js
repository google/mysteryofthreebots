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
