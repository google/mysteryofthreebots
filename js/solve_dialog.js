export class SolveDialog {
  constructor(root) {
    this.root_ = root;
    this.root_.addEventListener('submit', (event) => {
      event.preventDefault();
      this.checkSolution_();
    }, true);
  }

  openDialog_(dialogName, closeOthers = true) {
    const dialogs = document.querySelectorAll('.dialog');
    for (const dialog of Array.from(dialogs)) {
      if (dialog.classList.contains(dialogName)) {
        dialog.classList.add('open');
      }
      else if (closeOthers) {
        dialog.classList.remove('open');
      }
    }
  }

  checkSolution_() {
    const {who, room, container} = this.getFormData_();
    if (!who || !room || !container) {
      this.openDialog_('incomplete-solution', false);
    }
    else if (
      who === 'Professor Pluot' &&
      room === 'Living Room' &&
      container === 'A Hollow Bible'
    ) {
      this.openDialog_('win');
    }
    else {
      this.openDialog_('incorrect-solution');
    }
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
}
