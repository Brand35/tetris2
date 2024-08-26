import React from "react";
import { TETROMINOS } from "../pieces/pieces";
import "./displayNextPiece.scss"; // Ajoutez un fichier de styles si nécessaire

const NextPiece = ({ nextPiece }) => {
  if (!nextPiece || !nextPiece.shape) {
    return null; // Gérer le cas où nextPiece est undefined
  }

  return (
    <div className="next-piece">
      {nextPiece.shape.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`grid-cell ${cell !== 0 ? cell : ""}`}
              style={{
                backgroundColor:
                  cell !== 0 ? `rgba(${TETROMINOS[cell].color}, 0.8)` : "",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NextPiece;
