import Component from '@glimmer/component';
import { KEYBOARD } from 'ember-wordle/consts';

export default class GameKeyboardComponent extends Component {
  // Expose to template.
  KEYBOARD = KEYBOARD;
}
