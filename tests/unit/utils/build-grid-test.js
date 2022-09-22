import buildGrid from 'ember-wordle/utils/build-grid';
import { module, test } from 'qunit';

module('Unit | Utility | build-grid', function () {
  test('it works', function (assert) {
    const numRow = 2;
    const numCol = 2;
    const inputs = ['yo'];
    let result = buildGrid(numRow, numCol, inputs);
    assert.deepEqual(result, [
      ['y', 'o'],
      [null, null],
    ]);
  });
});
