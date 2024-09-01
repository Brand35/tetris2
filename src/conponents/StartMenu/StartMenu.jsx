import React from "react";
import "./StartMenu.scss";
import title from '../asset/title.jpg';

const StartMenu = ({ onStart, onOptions }) => {
  return (
    <div className="start-menu-container">
      <div className="menu-options">
      <img className='title' src={title} alt="" />
        <button className="menu-button" onClick={onStart}>       
        <span></span>
        <span></span>
        <span></span>
        <span></span>
          Start
        </button>
        <button className="menu-button" onClick={onOptions}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
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
            peut de nouveau remplir les cases libérées
          </p>
          <kbd>
            <kbd>ArrowRight</kbd> / <kbd>ArrowLeft</kbd> : Déplacer la pièce
            <kbd></kbd>
          </kbd>
        </div>

      </div>
    </div>
  );
};

export default StartMenu;
