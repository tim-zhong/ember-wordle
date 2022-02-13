import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { buildGame } from 'ember-wordle/models/game';

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
        this.router.replaceWith('game', curerntGameId);
        return;
      }

      const newGame = this.store.createRecord('game', buildGame(nextWord));
      newGame.save();
      this.router.replaceWith('game', newGame.get('id'));
    });
  }
}
