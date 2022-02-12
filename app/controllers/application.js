import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service store;
  @service router;

  @action
  createGame() {
    const newGame = this.store.createRecord('game', {
      startAt: Date.now(),
      inputs: [],
      evaluations: [],
      solution: 'hello',
    });
    newGame.save();
    this.router.transitionTo('game', newGame.get('id'));
  }
}
