import Component from '@glimmer/component';
import { service } from '@ember/service';
import { ROWS, EMOJI_BY_EVALUATION, COLS } from '../consts';

export default class ShareButtonComponent extends Component {
  @service toasts;

  get clipboardText() {
    const evaluations = this.args.game.evaluations.filter(
      (row) => row.length === COLS
    );

    const grid = evaluations.map((row) =>
      row.map((result) => EMOJI_BY_EVALUATION[result]).join('')
    );

    return [`${evaluations.length}/${ROWS}`, ...grid].join('\n');
  }

  handleSuccess = () => {
    this.toasts.post('Copied results to clipboard', 1000);
  };

  handleError = () => {
    this.toasts.post('Failed to copy results', 1000);
  };
}
