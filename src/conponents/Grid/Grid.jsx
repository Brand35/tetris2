import React, { useEffect, useState } from "react";
import { randomTetromino } from "../pieces/pieces";
import NextPiece from "../displayNextPiece/displayNextPiece";
import "./Grid.scss";

const Grid = ({ onHome, tetriminoColors }) => {
  const [gridSize, setGridSize] = useState({ width: 400, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) {
        setGridSize({ width: 200, height: 400 }); // Mobile
      } else if (screenWidth < 768) {
        setGridSize({ width: 300, height: 600 }); // Tablette
      } else {
        setGridSize({ width: 400, height: 800 }); // Bureau
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Appel initial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const rows = 20;
  const cols = 10;
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState(createEmptyGrid());
  const [level, setLevel] = useState(1); // Niveau initial
  const [linesCleared, setLinesCleared] = useState(0); // Nombre de lignes effacées au total
  const [nextPiece, setNextPiece] = useState(randomTetromino());
  const [currentPiece, setCurrentPiece] = useState({
    shape: randomTetromino().shape,
    x: Math.floor(cols / 2) - 1,
    y: 0,
  });
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isPaused, setIsPaused] = useState(false); // État de pause
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Détecte le mouvement horizontal pour le déplacement gauche/droite
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 30) {
        movePiece(1); // Droite
      } else if (deltaX < -30) {
        movePiece(-1); // Gauche
      }
    }

    // Détecte le mouvement vertical pour la descente
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY > 30) {
        dropPiece(); // Descente rapide
      }
    }

    // Empêche l'écran de défiler
    e.preventDefault();
  };


  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [touchStartX, touchStartY]);
  function createEmptyGrid() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };
  // Fonction pour vérifier les collisions
  const isColliding = (piece, grid, moveX, moveY) => {
    if (!piece || !piece.shape) return true; //ce petit morceau permet de differencier la piece et la forme de la piece
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (
          piece.shape[y][x] !== 0 &&
          (grid[piece.y + y + moveY] &&
            grid[piece.y + y + moveY][piece.x + x + moveX]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Fonction pour déplacer la pièce
  const movePiece = (dir) => {
    if (!isColliding(currentPiece, grid, dir, 0)) {
      setCurrentPiece((prev) => ({
        ...prev,
        x: prev.x + dir,
      }));
    }
  };
  const rotateMatrix = (matrix) => {
    const N = matrix.length;
    const result = Array.from({ length: N }, () => Array(N).fill(0));

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        result[x][N - y - 1] = matrix[y][x];
      }
    }

    return result;
  };

  const rotatePiece = (currentPiece) => {
    // Crée une copie de la pièce actuelle avec une matrice de forme tournée
    const rotatedShape = rotateMatrix(currentPiece.shape);

    // Crée une nouvelle pièce avec la forme tournée
    const rotatedPiece = {
      ...currentPiece,
      shape: rotatedShape,
    };
    if (!isColliding(rotatedPiece, grid, 0, 0)) {
      setCurrentPiece(rotatedPiece);
    } else if (!isColliding(rotatedPiece, grid, 1, 0)) {
      setCurrentPiece((prev) => ({
        ...prev,
        x: prev.x + 1,
        shape: rotatedShape,
      }));
    } else if (!isColliding(rotatedPiece, grid, -1, 0)) {
      setCurrentPiece((prev) => ({
        ...prev,
        x: prev.x - 1,
        shape: rotatedShape,
      }));
    }
  };
  // fonction pour la rotation de la pièce
  const rotatePieceInGrid = () => {
    const rotatedPiece = rotatePiece(currentPiece);
    if (!isColliding(rotatedPiece, grid, { x: 0, y: 0 })) {
      setCurrentPiece(rotatedPiece);
    }
  };
  // Fonction pour faire descendre la pièce
  const dropPiece = () => {
    if (!isColliding(currentPiece, grid, 0, 1)) {
      setCurrentPiece((prev) => ({
        ...prev,
        y: prev.y + 1,
      }));
    } else {
      // Fixer la pièce en place et générer une nouvelle pièce
      placePiece();
      resetPiece();
    }
  };

  // Fixer la pièce dans la grille
  const placePiece = () => {
    const newGrid = [...grid];
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newGrid[currentPiece.y + y][currentPiece.x + x] = value;
        }
      });
    });
    const { newGrid: updatedGrid, linesCleared } = clearFullLines(newGrid);
    setGrid(updatedGrid);
    setScore((prev) => prev + linesCleared * 100); // Exemple de calcul du score
    setLinesCleared((prev) => {
      const newLinesCleared = prev + linesCleared;

      // Mise à jour du niveau en fonction des lignes effacées
      if (newLinesCleared >= level * 10) {
        setLevel((prev) => prev + 1);
      }

      return newLinesCleared;
    });
  };

  // Réinitialiser la pièce
  const resetPiece = () => {
    const newPiece = {
      shape: nextPiece.shape,
      x: Math.floor(cols / 2) - 1,
      y: 0,
    };

    if (isColliding(newPiece, grid, 0, 0)) {
      setGameOver(true);
    } else {
      setCurrentPiece(newPiece);
      setNextPiece(randomTetromino()); // Génère une nouvelle pièce pour la prochaine fois
    }
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        movePiece(-1);
      } else if (e.key === "ArrowRight") {
        movePiece(1);
      } else if (e.key === "ArrowDown") {
        dropPiece();
      } else if (e.key === "ArrowUp") {
        rotatePieceInGrid();
      } else if (e.key === "p" || e.key === "P") {
        togglePause(); // Pause/Unpause du jeu
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPiece, grid, isPaused]);

  // Faire tomber la pièce automatiquement
  useEffect(() => {
    const dropInterval = setInterval(() => {
      dropPiece();
    }, Math.max(100, 1000 - level * 100)); // Diminue l'intervalle avec l'augmentation du niveau, jusqu'à un minimum

    return () => clearInterval(dropInterval);
  }, [currentPiece, level]);

  // Fonction pour dessiner la grille avec la pièce en mouvement
  const drawGridWithPiece = () => {
    const gridCopy = grid.map((row) => [...row]);

    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const gridX = currentPiece.x + x;
          const gridY = currentPiece.y + y;
          if (
            gridY >= 0 &&
            gridY < grid.length &&
            gridX >= 0 &&
            gridX < grid[0].length
          ) {
            gridCopy[gridY][gridX] = value; // Assigner la valeur de la pièce en mouvement à la grille
          }
        }
      });
    });

    return gridCopy;
  };

  const clearFullLines = (grid) => {
    const newGrid = grid.filter((row) => row.some((cell) => cell === 0));
    const linesCleared = rows - newGrid.length;

    // Ajouter des lignes vides en haut de la grille
    for (let i = 0; i < linesCleared; i++) {
      newGrid.unshift(Array(cols).fill(0));
    }

    return { newGrid, linesCleared };
  };

  const resetGame = () => {
    setGrid(createEmptyGrid());
    setScore(0);
    setLevel(1);
    setLinesCleared(0);
    setGameOver(false);
    resetPiece();
  };

  return (
    <div className="tetris-container">
      <button className="home-button" onClick={onHome}>
        Home
      </button>
      <div className="controls">
        <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
        <button onClick={resetGame}>Restart</button>
      </div>
      {gameOver ? (
        <div className="game-over">
          <h1>Game Over</h1>
        </div>
      ) : isPaused ? (
        <div className="pause-menu">
          <h1>Paused</h1>
        </div>
      ) : (
        <div className="grid-container">
          <div className="score">Score: {score}</div>
          <div className="level">Level: {level}</div>
          <div className="grid">
            {drawGridWithPiece().map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, cellIndex) => (
                  <div
                    key={`${rowIndex}-${cellIndex}`}
                    className={`grid-cell ${cell !== 0 ? cell : ""}`}
                    style={{
                      background: cell !== 0 ? tetriminoColors[cell] : "none",
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          {/* Afficher nextPiece uniquement si le jeu n'est pas terminé et que le jeu n'est pas en pause */}
          <div className="next-piece-container">
            <NextPiece
              nextPiece={nextPiece}
              tetriminoColors={tetriminoColors}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
