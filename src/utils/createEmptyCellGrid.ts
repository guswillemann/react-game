import { GRID_SIZE } from '../constants';
import { CellGrid } from '../types';

export default function createEmptyCellGrid() {
  const grid: CellGrid = [];

  for (let y = 0;y < GRID_SIZE;y++) {
    grid.push([]);
    for (let x = 0;x < GRID_SIZE;x++) {
      grid[y].push('');
    }
  }

  return grid;
};