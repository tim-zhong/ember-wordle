import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS, SPECIAL_KEY } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';

export default class GameController extends Controller {
  @tracked
  currentInput = '';

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
