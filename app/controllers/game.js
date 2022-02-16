import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS, ROWS, SPECIAL_KEY } from 'ember-wordle/consts';
import evaluate from 'ember-wordle/utils/evaluate';
import { later } from '@ember/runloop';
import { service } from '@ember/service';
import { EVALUATION, GAME_STATUS, CHEERS } from '../consts';
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

  get hasWon() {
    return this.model.status === GAME_STATUS.WIN;
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

    if (this.isHelpModalOpen || this.isStatsModalOpen) {
      return;
    }

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
        model.status = GAME_STATUS.WIN;
        model.lastCompletedAt = Date.now();
        later(
          () =>
            this.destructors.push(
              this.toasts.post(CHEERS[this.model.inputs.length - 1], 2000)
            ),
          1200
        );
        later(() => {
          this.openStatsModal();
          this.showNextGameButton = true;
        }, 2000);
      } else if (model.evaluations.length === ROWS) {
        model.status = GAME_STATUS.FAIL;
        later(() => {
          this.destructors.push(
            this.toasts.post(this.model.solution.toUpperCase())
          );
          this.showNextGameButton = true;
        }, 1200);
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
    this.closeHelpModal();
    this.showNextGameButton = false;
  }

  /**
   * ---------------- Modals ----------------
   */

  @tracked allGames = [];
  @tracked isStatsModalOpen = false;
  @tracked isHelpModalOpen = false;

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
  maybeShowModal() {
    if (this.model.status === GAME_STATUS.WIN) {
      later(() => {
        this.openStatsModal();
        this.showNextGameButton = true;
      }, 1200);
      return;
    }

    if (this.model.status === GAME_STATUS.FAIL) {
      later(() => {
        this.destructors.push(
          this.toasts.post(this.model.solution.toUpperCase())
        );
        this.showNextGameButton = true;
      }, 1200);
      return;
    }

    const games = this.store.peekAll('game').content;
    if (
      games.length === 1 &&
      games.firstObject.id === this.model.id &&
      !this.model.inputs.length
    ) {
      // first time playing
      this.openHelpModal();
    }
  }

  @action
  openHelpModal() {
    this.isHelpModalOpen = true;
  }

  @action
  closeHelpModal() {
    this.isHelpModalOpen = false;
  }
}
