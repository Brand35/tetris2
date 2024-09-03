import React from "react";
import "./StartMenu.scss";
import title from "../asset/title.jpg";

const StartMenu = ({ onStart, onOptions }) => {
  return (
    <div className="start-menu-container">
      <div className="menu-options">
        <img className="title" src={title} alt="" />
        <button className="menu-button" onClick={onStart}>
          Start
        </button>
        <button className="menu-button" onClick={onOptions}>
          Options
        </button>
      </div>
      <div className="game-rules">
        <div className="rules-container">
          <h1>HOW TO PLAY</h1>
          <p>
            Tetris met le joueur au défi de réaliser des lignes complètes en
            déplaçant des pièces de formes différentes, les tétrominos, qui
            défilent depuis le haut jusqu'au bas de l'écran. Les lignes
            complétées disparaissent tout en rapportant des points et le joueur
            peut de nouveau remplir les cases libérées<br></br>
            <kbd>
              &#8592; deplacer la piece à gauche<br></br>
            </kbd>
            <kbd>
              &#8593; ratation de la piece <br></br>
            </kbd>
            <kbd>
              &#8594; deplacer la piece à droite<br></br>
            </kbd>
            <kbd>
              &#8595; descendre la piéce plus rapidement <br></br>
            </kbd>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
