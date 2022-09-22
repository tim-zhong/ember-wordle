import Component from '@glimmer/component';
import { COLS, ROWS } from 'ember-wordle/consts';
import { later } from '@ember/runloop';
import buildGrid from 'ember-wordle/utils/build-grid';

/**
 * Renders a grid of letters representing the user inputs
 * and the current state of the game.
 *
 * @arg {string[]} submittedInputs -- Valid input strings that has been submitted
 * @arg {string} currentInput -- Input string the user is currently editing
 * @arg {string[][]} evaluations -- 2D array that maps each submitted letter to its evaluation result
 * @arg {number} shakeRowIdx -- Index of the row to apply shaking animation
 */
export default class GameGridComponent extends Component {
  get grid() {
    return buildGrid(ROWS, COLS, [
      ...this.args.submittedInputs,
      this.args.currentInput,
    ]);
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
