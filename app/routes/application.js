import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;
  @service router;

  model() {
    return this.store.findAll('game');
  }

  afterModel(model) {
    const curerntGameId = model.get('content.lastObject.id');

    if (curerntGameId) {
      this.router.transitionTo('game', curerntGameId);
      return;
    }

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
