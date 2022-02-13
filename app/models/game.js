import Model, { attr } from '@ember-data/model';

export default class GameModel extends Model {
  @attr('number') lastPlayedAt;
  @attr('number') lastCompletedAt;
  @attr('boolean') won;
  @attr('array') inputs;
  @attr('array') evaluations;
  @attr('string') solution;
}

export function buildGame(solution) {
  return {
    lastPlayedAt: null,
    lastCompletedAt: null,
    won: false,
    inputs: [],
    evaluations: [],
    solution,
  };
}
// success state
// stats
// model in application
// display answer if failed
// keyboard
// header
