import Model, { attr } from '@ember-data/model';

export default class GameModel extends Model {
  @attr('number') lastPlayedAt;
  @attr('number') lastCompletedAt;
  @attr('string') status;
  @attr('array') inputs;
  @attr('array') evaluations;
  @attr('string') solution;
}

export function buildGame(solution) {
  return {
    lastPlayedAt: null,
    lastCompletedAt: null,
    status: null,
    inputs: [],
    evaluations: [],
    solution,
  };
}
