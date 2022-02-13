import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS, SPECIAL_KEY } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';
import { later } from '@ember/runloop';
import { service } from '@ember/service';
import { EVALUATION, GAME_STATE } from '../consts';

export default class GameController extends Controller {
  @service dictionary;
  @service toasts;
  @service store;

  @tracked currentInput = '';
  @tracked isLastSubmissionInvalid = false;

  get finished() {
    return this.model.state;
  }

  @action
  handleInput(keyName) {
    this.isLastSubmissionInvalid = false;

    if (this.model.status) {
      return;
    }

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

      if (!currEvaluation.some((e) => e !== EVALUATION.CORRECT)) {
        model.status = GAME_STATE.WIN;
      } else if (model.evaluations.length === ROWS) {
        model.status = GAME_STATE.FAIL;
      }
      if (model.status) {
        model.lastCompletedAt = Date.now();
      }

      this.currentInput = '';
    }

    model.save();
  }

  /**
   * ---------------- Modals ----------------
   */

  allGames = [];
  @tracked isStatsModalOpen = false;

  @action openStatsModal(delay = 0) {
    later(() => {
      // TODO: Fix this
      this.store.findAll('game').then(({ content }) =>
        Promise.all(content.map(({ id }) => this.store.query('game', id))).then(
          (games) => {
            this.allGames = games;
            this.isStatsModalOpen = true;
          }
        )
      );
    }, delay);
  }

  @action closeStatsModal() {
    this.isStatsModalOpen = false;
  }

  @action maybeOpenStatsModal() {
    if (this.model.status === GAME_STATE.WIN) {
      this.openStatsModal(1200);
    }
  }
}
