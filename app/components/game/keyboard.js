import Component from '@glimmer/component';
import { KEYBOARD } from 'ember-wordle/consts';
import { EVALUATION } from '../../consts';

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
