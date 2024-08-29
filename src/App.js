import React, { useEffect, useState } from "react";
import "./App.scss";
import Grid from "./conponents/Grid/Grid";
import StartMenu from "./conponents/StartMenu/StartMenu";
import OptionsMenu from "./conponents/OptionMenu/OptionMenu";
import { randomTetromino } from "./conponents/pieces/pieces";


function App() {
  
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("start");
  const [activeTheme, setActiveTheme] = useState("default");
const[nextPiece, setNextPiece]= useState(randomTetromino())
  const themes = {
    default: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #1DB4F3 0.01%, #097AA9 100%)",
         
      },
      tetriminoColors: {
        I: "#1f78b4",
        J: "#33a02c",
        L: "#fb9a99",
        O: "#e31a1c",
        S: "#ff7f00",
        T: "#6a3d9a",
        Z: "#b15928",
       
      },
    },
    neon: {
      backgroundStyle:{
      background: "#000000",
      },
      tetriminoColors: {
        I: "#0ff",
        J: "#1e90ff",
        L: "#ff4500",
        O: "#ffff00",
        S: "#32cd32",
        T: "#ff1493",
        Z: "#ff6347",
      },
    },
  
    theme2: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #E71DA4 0%, #A21171 100%)",
      },
       tetriminoColors: {
        I: "#1f78b4",
        J: "#33a02c",
        L: "#fb9a99",
        O: "#e31a1c",
        S: "#ff7f00",
        T: "#6a3d9a",
        Z: "#b15928",
      },
    },
    // Ajoutez plus de thèmes ici
  };

  const handleThemeToggle = (theme) => {
    setActiveTheme(theme);
  };


  const handleStart = () => {
    setIsGameStarted(true);
  };

  const handleOptions = () => {
    setCurrentMenu("options");
  };

  // const handleAccessibility = () => {
  //   alert("Accessibility menu - functionality not implemented yet!");
  // };
  const handleHome = () => {
    setIsGameStarted(false); // Retour à la page d'accueil
    setCurrentMenu("start"); // Retour à la page d'accueil
  };
  return (
    <div className="app" style={themes[activeTheme].backgroundStyle}>
      {isGameStarted ? (
        <Grid
          tetriminoColors={themes[activeTheme].tetriminoColors}
          onHome={handleHome}
           nextPiece={nextPiece}
      
        />
      ) : (
        <>
          {currentMenu === "start" && (
            <StartMenu onStart={handleStart} onOptions={handleOptions} />
          )}
          {currentMenu === "options" && (
            <OptionsMenu
              onHome={handleHome}
              activeTheme={activeTheme}
              onThemeToggle={handleThemeToggle}
              themes={themes}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
