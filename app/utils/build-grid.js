export default function buildGrid(numRow, numCol, inputs) {
  const letterGrid = [...inputs.map((str) => str.split(''))];

  return Array(numRow)
    .fill()
    .map((_, rowIdx) =>
      Array(numCol)
        .fill()
        .map((_, colIdx) => letterGrid[rowIdx]?.[colIdx] ?? null)
    );
}
