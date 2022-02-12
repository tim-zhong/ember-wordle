import Model, { attr } from '@ember-data/model';

export default class GameModel extends Model {
  @attr startAt;
  // @attr('array') inputs;
  // @attr('array') evaluations;
  @attr('string') solution;
}
