import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class GameRoute extends Route {
  @service store;
  @service router;

  model(params) {
    return this.store.find('game', params.game_id);
  }

  @action
  error({ errors }) {
    if (errors?.[0]?.status === '404') {
      this.router.replaceWith('/');
    } else {
      // Let the route above this handle the error.
      return true;
    }
  }

  afterModel(model) {
    if (!model.won) {
      model.lastPlayAt = Date.now();
      model.save();
    }
  }
}
