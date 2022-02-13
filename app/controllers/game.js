import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS, SPECIAL_KEY } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';
import { service } from '@ember/service';
import { EVALUATION } from '../consts';

export default class GameController extends Controller {
  @service dictionary;
  @service toasts;

  @tracked currentInput = '';
  @tracked isLastSubmissionInvalid = false;

  @action
  handleInput(keyName) {
    this.isLastSubmissionInvalid = false;

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
      if (!this.dictionary.validate(userInput)) {
        this.isLastSubmissionInvalid = true;
        this.toasts.post('Not in word list', 1000);
        return;
      }

      const currEvaluation = evaluate(userInput, model.solution);
      model.evaluations = [...model.evaluations, currEvaluation];
      model.inputs = [...model.inputs, userInput];
      model.won = !currEvaluation.some((e) => e !== EVALUATION.CORRECT);
      if (model.won) {
        model.lastCompletedAt = Date.now();
      }

      this.currentInput = '';
    }

    model.save();
  }
}
