import Component from '@glimmer/component';
import { COLS, ROWS } from 'ember-wordle/consts';
import buildGrid from 'ember-wordle/utils/build-grid';

export default class GameGridComponent extends Component {
  get grid() {
    return buildGrid(ROWS, COLS, [
      ...this.args.submittedInputs,
      this.args.currentInput,
    ]);
  }
}
