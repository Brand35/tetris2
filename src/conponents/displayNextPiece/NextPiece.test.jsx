import NextPiece from './displayNextPiece';
import React from 'react';
import { render } from '@testing-library/react';

test('renders next piece correctly', () => {
    const nextPiece = { shape: [[1]], type: 'I' };
    const tetriminoColors = { I: '#1f78b4' };
    
    const { container } = render(<NextPiece nextPiece={nextPiece} tetriminoColors={tetriminoColors} />);
    
    const cell = container.querySelector('.grid-cell');
    expect(cell).toHaveStyle('background-color: #1f78b4');
  });