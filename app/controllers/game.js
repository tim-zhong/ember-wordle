import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';

export default class GameController extends Controller {
  @tracked
  userInput = '';

  @action
  handleInput(char) {
    if (this.userInput.length < COLS) {
      this.userInput = this.userInput.concat(char);
    }
  }

  @action
  handleSubmit() {
    const { model, userInput } = this;

    if (model.evaluations.length < ROWS && userInput.length === COLS) {
      model.evaluations.push(evaluate(userInput, model.solution));
      model.inputs.push(userInput);

      this.userInput = '';
    }

    model.save();
  }
}
