import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game/grid', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      submittedInputs: ['apple'],
      currentInput: 'ber',
      evaluations: [['CORRECT', 'PRESENT', 'ABSENT', 'PRESENT', 'PRESENT']],
      shakeRowIdx: undefined,
    });

    await render(hbs`
      <Game::Grid
        @submittedInputs={{this.submittedInputs}}
        @currentInput={{this.currentInput}}
        @evaluations={{this.evaluations}}
        @shakeRowIdx={{this.shakeRowIdx}}
      />
     `);

    assert.dom(this.element).hasText('a p p l e b e r');
  });
});
