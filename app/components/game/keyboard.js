import Component from '@glimmer/component';
import { KEYBOARD } from 'ember-wordle/consts';
import { EVALUATION } from '../../consts';

/**
 * Renders a qwerty keyboard that allows user to input by either
 * clicking or typing a letter
 *
 * @arg {function} handleInput -- Callback when input has changed
 * @arg {string[]} inputs -- Valid input strings that has been submitted
 * @arg {string[][]} evaluations -- 2D array that maps each submitted letter to its evaluation result
 */
export default class GameKeyboardComponent extends Component {
  get keyboard() {
    return KEYBOARD.map((row) =>
      row.map((key) => ({
        ...key,
        class: this.getKeyClass(key.name),
      }))
    );
  }

  get evaluationsByLetter() {
    const map = {};
    this.args.inputs.forEach((input, rowIdx) => {
      input.split('').forEach((letter, colIdx) => {
        map[letter] = [
          ...(map[letter] ?? []),
          this.args.evaluations[rowIdx][colIdx],
        ];
      });
    });
    return map;
  }

  getKeyClass(letter) {
    const evaluaitons = new Set(this.evaluationsByLetter[letter]);
    if (evaluaitons.has(EVALUATION.CORRECT)) {
      return 'keyboard__key--correct';
    }
    if (evaluaitons.has(EVALUATION.PRESENT)) {
      return 'keyboard__key--present';
    }
    if (evaluaitons.has(EVALUATION.ABSENT)) {
      return 'keyboard__key--absent';
    }
    return '';
  }
}
