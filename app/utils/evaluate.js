import { EVALUATION } from 'ember-wordle/consts';

export default function evaluate(input, solution) {
  if (input.length !== solution.length) {
    throw new Error(
      `Failed to evaluate: ${input} and ${solution} has different length`
    );
  }

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
