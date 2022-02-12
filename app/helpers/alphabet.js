import { helper } from '@ember/component/helper';
import { ALPHABET } from 'ember-wordle/consts';

export default helper(function alphabet() {
  return ALPHABET;
});
