import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { buildGame } from 'ember-wordle/models/game';

module('Unit | Serializer | application', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('game');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('game', buildGame('apple'));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
