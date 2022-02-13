import Service from '@ember/service';
import { COMMON_WORDS, RARE_WORDS } from 'ember-wordle/data/words';
import { service } from '@ember/service';

const MAX_PICK_WORD_RETRIES = 10;

export default class DictionaryService extends Service {
  @service store;

  _validWords = new Set([...COMMON_WORDS, ...RARE_WORDS]);

  _getRandomWord() {
    return COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
  }

  async pickWord() {
    let word = this._getRandomWord();

    for (let i = 0; i < MAX_PICK_WORD_RETRIES; i++) {
      const used = await !!this.store.query('game', {
        filter: { solution: word },
      });

      if (!used) {
        break;
      }

      word = this._getRandomWord();
    }

    return word;
  }

  validate(word) {
    return this._validWords.has(word.toLowerCase());
  }
}
