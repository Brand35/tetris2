import React from 'react';
import { TETROMINOS } from './pieces';
import './Piece.scss';

const Piece = ({ piece }) => {
  return (
    <div className="piece">
      {piece.shape.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className="piece-cell"
            style={{
              backgroundColor: cell !== 0 ? `rgba(${TETROMINOS[cell].color}, 0.8)` : 'transparent',
            }}
          >
            {cell !== 0 && <div className="block"></div>}
          </div>
        ))
      )}
    </div>
  );
};

export default Piece;

