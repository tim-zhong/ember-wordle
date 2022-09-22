import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

class MockToastsService extends Service {
  get toasts() {
    return [{ message: 'bar' }];
  }
}

module('Integration | Component | toasts', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.owner.register('service:toasts', MockToastsService);

    await render(hbs`<Toasts />`);

    assert.dom(this.element).hasText('bar');
  });
});
