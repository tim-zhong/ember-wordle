import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | share-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('evaluations', [
      ['CORRECT', 'CORRECT', 'CORRECT', 'CORRECT', 'CORRECT'],
    ]);

    await render(hbs`
      <ShareButton
        @evaluations={{this.evaluations}}
      />
    `);

    assert.dom(this.element).hasText('Share');
  });
});
