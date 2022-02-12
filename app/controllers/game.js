import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS, SPECIAL_KEY, KEYBOARD } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';
import buildGrid from 'ember-wordle/utils/build-grid';

export default class GameController extends Controller {
  KEYBOARD = KEYBOARD;

  @tracked
  currentInput = '';

  get grid() {
    return buildGrid(ROWS, COLS, [...this.model.inputs, this.currentInput]);
  }

  @action
  handleInput(keyName) {
    if (keyName === SPECIAL_KEY.ENTER.name) {
      this._handleSubmit();
      return;
    }

    if (keyName === SPECIAL_KEY.BACKSPACE.name) {
      this.currentInput = this.currentInput.slice(0, -1);
      return;
    }

    if (this.currentInput.length < COLS) {
      this.currentInput = this.currentInput.concat(keyName);
    }
  }

  @action
  _handleSubmit() {
    const { model, currentInput: userInput } = this;

    if (
      userInput &&
      userInput.length === COLS &&
      model.evaluations.length < ROWS
    ) {
      model.evaluations.push(evaluate(userInput, model.solution));
      model.inputs.push(userInput);

      this.currentInput = '';
    }

    model.save();
  }
}
