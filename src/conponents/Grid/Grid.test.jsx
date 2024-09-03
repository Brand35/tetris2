import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from './Grid';

import { Piece } from './Grid';
import { render } from '@testing-library/react';

test('renders grid with correct number of rows and cells', () => {
  render(<Grid />);
  
  // Test que la grille a bien 20 lignes
  const rows = screen.getAllByTestId('grid-row');
  expect(rows.length).toBe(20);

  // Test que chaque ligne a 10 cellules
  rows.forEach((row) => {
    const cells = row.querySelectorAll('.grid-cell');
    expect(cells.length).toBe(10);
  });
});





