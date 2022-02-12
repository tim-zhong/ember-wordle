import Component from '@glimmer/component';
import { action } from '@ember/object';

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
