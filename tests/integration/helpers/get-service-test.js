import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

class MockService extends Service {
  get foo() {
    return 'bar';
  }
}

module('Integration | Helper | get-service', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    this.owner.register('service:mock-service', MockService);

    await render(hbs`{{get (get-service 'mock-service') 'foo'}}`);

    assert.dom(this.element).hasText('bar');
  });
});
