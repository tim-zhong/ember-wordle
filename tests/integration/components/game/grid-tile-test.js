import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game/grid-tile', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      letter: 'A',
      evaluation: 'CORRECT',
    });

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <Game::GridTile 
        @letter={{this.letter}}
        @evaluation={{this.evaluation}}
      />
    `);

    assert.dom(this.element).hasText('A');
  });
});
