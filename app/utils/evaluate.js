import { EVALUATION } from 'ember-wordle/consts';
import { assert } from '@ember/debug';

export default function evaluate(input, solution) {
  assert(
    `Failed to evaluate: ${input} and ${solution} has different length`,
    input.length === solution.length
  );

  return input.split('').reduce((result, char, index) => {
    if (solution[index].toLowerCase() === char.toLowerCase()) {
      return [...result, EVALUATION.CORRECT];
    }
    if (solution.toLowerCase().includes(char.toLowerCase())) {
      return [...result, EVALUATION.PRESENT];
    }
    return [...result, EVALUATION.ABSENT];
  }, []);
}
