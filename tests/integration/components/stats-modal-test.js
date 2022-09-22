import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | stats-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      onClose: () => {},
      games: [],
      goToNextGame: () => {},
      currentGameStatus: 'apple',
      currentGameEvaluations: [
        ['CORRECT', 'PRESENT', 'ABSENT', 'PRESENT', 'PRESENT'],
      ],
    });

    // Template block usage:
    await render(hbs`
      <StatsModal
        @onClose={{this.onClose}}
        @games={{this.games}}
        @goToNextGame={{this.goToNextGame}}
        @currentGameStatus={{this.currentGameStatus}}
        @currentGameEvaluations={{this.currentGameEvaluations}}
      />
    `);

    assert.dom('[data-test-stats-modal-header]').hasText('Statistics');
  });
});
