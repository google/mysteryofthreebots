export class SolveDialog {
  constructor(root) {
    this.root_ = root;
    this.root_.addEventListener('submit', (event) => {
      event.preventDefault();
      this.checkSolution_();
    }, true);
    this.remainingTries_ = 3;
    this.remainingTriesEl_ = this.root_
        .querySelector('.solve__notebook__remaining-tries');
  }

  openDialog_(dialogName) {
    const dialogs = document.querySelectorAll('.dialog');
    for (const dialog of Array.from(dialogs)) {
      if (dialog.classList.contains('dialogName')) {
        dialog.classList.add('open');
      }
      else {
        dialog.classList.remove('open');
      }
    }
  }

  checkSolution_() {
    if (this.remainingTries_ === 0) {
      return;
    }
    const {who, room, container} = this.getFormData_();
    if (
      who === 'Professor Pluot' &&
      room === 'Living Room' &&
      container === 'A Hollow Bible'
    ) {
      this.openDialog_('win');
    }
    else {
      this.openDialog_('incorrect-solution');
      alert(`No, that can't be right...try again`);
    }
    this.remainingTries_ -= 1;
    this.updateRemainingTries_();
  }

  getFormData_() {
    const who = this.root_.querySelector('[name="who"]:checked');
    const room = this.root_.querySelector('[name="what-room"]:checked');
    const container = this.root_.querySelector('[name="what-container"]:checked');

    return {
      who: who ?
          who.value :
          undefined,
      room: room ?
          room.value :
          undefined,
      container: container ?
          container.value :
          undefined,
    };
  }

  updateRemainingTries_() {
    let numberString;
    let triesString = 'times';

    switch (this.remainingTries_) {
      case 0:
        numberString = 'zero';
        break;
      case 1:
        numberString = 'one';
        triesString = 'time';
        break;
      case 2:
        numberString = "two";
        break;
      case 3:
        numberString = "three";
        break;
    }

    this.remainingTriesEl_.textContent = `${numberString} more ${triesString}`;
  }
}
