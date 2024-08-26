import React from "react";
import "./StartMenu.scss";

const StartMenu = ({ onStart, onOptions, onAccessibility, onHome }) => {
  return (
    <div className="start-menu-container">
      <div className="menu-options">
        <h1 className="menu-title">Tetris</h1>
        <button className="menu-button" onClick={onStart}>
          Start
        </button>
        <button className="menu-button" onClick={onOptions}>
          Options
        </button>
        <button className="menu-button" onClick={onAccessibility}>
          Accessibilité
        </button>
      </div>
      <div className="game-rules">
        <div className="rules-container">
          <h2>HOW TO PLAY</h2>
          <p>
            Tetris met le joueur au défi de réaliser des lignes complètes en
            déplaçant des pièces de formes différentes, les tétrominos, qui
            défilent depuis le haut jusqu'au bas de l'écran. Les lignes
            complétées disparaissent tout en rapportant des points et le joueur
            peut de nouveau remplir les cases libérées
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
