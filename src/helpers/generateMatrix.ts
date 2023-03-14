export const generateMatrix = (cells: number): [number, number][] => {
  const matrix: [number, number][] = [];
  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      matrix.push([x, y]);
    }
  }
  return matrix;
};
