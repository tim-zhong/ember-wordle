import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS, SPECIAL_KEY } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';
import { later } from '@ember/runloop';
import { service } from '@ember/service';
import { EVALUATION, GAME_STATE, CHEERS } from '../consts';
import { buildGame } from 'ember-wordle/models/game';

export default class GameController extends Controller {
  @service dictionary;
  @service toasts;
  @service store;
  @service router;

  @tracked currentInput = '';
  @tracked isLastSubmissionInvalid = false;
  @tracked showNextGameButton = false;

  destructors = [];

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
      model.lastPlayedAt = Date.now();

      if (!this.dictionary.validate(userInput)) {
        this.isLastSubmissionInvalid = true;
        this.destructors.push(this.toasts.post('Not in word list', 1000));
        return;
      }

      const currEvaluation = evaluate(userInput, model.solution);
      model.evaluations = [...model.evaluations, currEvaluation];
      model.inputs = [...model.inputs, userInput];

      if (!currEvaluation.some((e) => e !== EVALUATION.CORRECT)) {
        model.status = GAME_STATE.WIN;
        model.lastCompletedAt = Date.now();
        later(
          () =>
            this.destructors.push(
              this.toasts.post(CHEERS[this.model.inputs.length - 1], 2000)
            ),
          1200
        );
      } else if (model.evaluations.length === ROWS) {
        model.status = GAME_STATE.FAIL;
      }

      this.currentInput = '';
    }

    model.save();
  }

  @action
  nextGame() {
    this.dictionary.pickWord().then((nextWord) => {
      this.cleanup();

      const newGame = this.store.createRecord('game', buildGame(nextWord));
      newGame.save();
      this.router.replaceWith('game', newGame.get('id'));
    });
  }

  @action
  cleanup() {
    this.destructors.forEach((distruct) => distruct());
    this.closeStatsModal();
  }

  /**
   * ---------------- Modals ----------------
   */

  @tracked allGames = [];
  @tracked isStatsModalOpen = false;

  @action
  openStatsModal() {
    // TODO: Fix this
    this.store
      .findAll('game')
      .then(({ content }) =>
        Promise.all(content.map(({ id }) => this.store.findRecord('game', id)))
      )
      .then((games) => {
        this.allGames = games;
        this.isStatsModalOpen = true;
      });
  }

  @action
  closeStatsModal() {
    this.isStatsModalOpen = false;
  }

  @action
  maybeShowPostGameState() {
    if (!this.model.status) {
      return;
    }
    later(() => {
      if (this.model.status === GAME_STATE.WIN) {
        this.openStatsModal(1200);
      }
      if (this.model.status === GAME_STATE.FAIL) {
        this.destructors.push(
          this.toasts.post(this.model.solution.toUpperCase())
        );
      }
      this.showNextGameButton = true;
    }, 1200);
  }
}
