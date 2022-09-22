import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game/keyboard', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      handleInput: () => {},
      inputs: ['apple'],
      evaluations: [['CORRECT', 'PRESENT', 'ABSENT', 'PRESENT', 'PRESENT']],
    });

    await render(hbs`
      <Game::Keyboard 
        @handleInput={{this.handleInput}}
        @inputs={{this.inputs}}
        @evaluations={{this.evaluations}}
      />
    `);

    assert
      .dom(this.element)
      .hasText('Q W E R T Y U I O P A S D F G H J K L Enter Z X C V B N M');
  });
});
