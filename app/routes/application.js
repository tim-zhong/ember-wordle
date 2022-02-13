import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;
  @service router;

  @service dictionary;

  model() {
    return this.store.findAll('game');
  }

  afterModel(model) {
    const curerntGameId = model.get('content.lastObject.id');

    this.dictionary.pickWord().then((nextWord) => {
      if (curerntGameId) {
        this.router.transitionTo('game', curerntGameId);
        return;
      }

      const newGame = this.store.createRecord('game', {
        startAt: Date.now(),
        inputs: [],
        evaluations: [],
        solution: nextWord,
      });
      newGame.save();
      this.router.transitionTo('game', newGame.get('id'));
    });
  }
}
