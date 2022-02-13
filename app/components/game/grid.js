import Component from '@glimmer/component';
import { COLS, ROWS } from 'ember-wordle/consts';
import { later } from '@ember/runloop';
import buildGrid from 'ember-wordle/utils/build-grid';

export default class GameGridComponent extends Component {
  get grid() {
    return buildGrid(ROWS, COLS, [
      ...this.args.submittedInputs,
      this.args.currentInput,
    ]);
  }

  get invalidRowIdx() {
    return this.args.isLastWordInvalid
      ? this.args.submittedInputs.length
      : null;
  }

  shakeRow(element, [isInvalid]) {
    const className = 'grid__row--invalid';

    if (isInvalid) {
      element.classList.add(className);
      later(() => {
        element.classList.remove(className);
      }, 600);
    }
  }
}
