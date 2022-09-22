import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Renders a single grid tile that may or may not contain a letter
 *
 * @arg {(string | undefined)} letter -- Letter on the tile
 * @arg {(string | evaluation)} evaluation -- Evaluation result of the letter on the tile
 */
export default class GameGridTileComponent extends Component {
  @action
  handleLetterUpdate(element, [letter]) {
    if (letter) {
      element.classList.add('pop');
    } else {
      element.classList.remove('pop');
    }
  }
}
