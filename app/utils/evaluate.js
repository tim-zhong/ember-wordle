export default function evaluate(input, solution) {
  if (input.length !== solution.length) {
    throw new Error(
      `Failed to evaluate: ${input} and ${solution} has different length`
    );
  }

  return input.split('').reduce((result, char, index) => {
    if (solution[index].toLowerCase() === char.toLowerCase()) {
      return [...result, 'correct'];
    }
    if (solution.includes(char)) {
      return [...result, 'misplaced'];
    }
    return [...result, 'incorrect'];
  }, []);
}
