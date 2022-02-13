import Component from '@glimmer/component';
import { action } from '@ember/object';
import { later } from '@ember/runloop';

const CONTENT_ELEMENT_ID = 'modal__content';
const ANIMATION_CLASSNAME = 'modal__content--closing';
const ANIMATION_DURATION_MS = 150;

export default class ModalComponent extends Component {
  get contentElement() {
    return document.getElementById(CONTENT_ELEMENT_ID);
  }

  @action
  handleCloseClick() {
    this.contentElement.classList.add(ANIMATION_CLASSNAME);
    later(() => {
      this.contentElement.classList.remove(ANIMATION_CLASSNAME);
      this.args.onClose();
    }, ANIMATION_DURATION_MS);
  }

  @action
  handleOverlayClick(event) {
    if (event.composedPath().includes(this.contentElement)) {
      return;
    }
    this.handleCloseClick();
  }
}
