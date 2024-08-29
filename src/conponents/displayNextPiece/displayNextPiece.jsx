import React from "react";
import { TETROMINOS } from "../pieces/pieces";
import "./displayNextPiece.scss"; // Ajoutez un fichier de styles si nécessaire

const NextPiece = ({ nextPiece,tetriminoColors }) => {
  if (!nextPiece || !nextPiece.shape) {
    return null; // Gérer le cas où nextPiece est undefined
  }
  console.log("NextPiece:", nextPiece);
  console.log("Colors:", tetriminoColors);
  return (
    <div className="next-piece">
    {nextPiece.shape.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className="grid-cell"
            style={{
              backgroundColor:
                cell !== 0 ? tetriminoColors[nextPiece.type] : "",
            }}
          ></div>
        ))}
      </div>
    ))}
  </div>
);
};
export default NextPiece;
