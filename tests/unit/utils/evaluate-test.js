import evaluate from 'ember-wordle/utils/evaluate';
import { module, test } from 'qunit';

module('Unit | Utility | evaluate', function () {
  // TODO: Replace this with your real tests.
  test('it works', function (assert) {
    const input = 'crane';
    const solution = 'adobe';

    let result = evaluate(input, solution);
    assert.deepEqual(result, [
      'ABSENT',
      'ABSENT',
      'PRESENT',
      'ABSENT',
      'CORRECT',
    ]);
  });
});
