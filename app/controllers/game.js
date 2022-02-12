import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { COLS } from 'ember-wordle/consts';

export default class GameController extends Controller {
  @tracked
  userInput = '';

  @action
  handleInput(char) {
    console.log(char);
    if (this.userInput.length < COLS) {
      this.userInput = this.userInput.concat(char);
    }
  }
}
