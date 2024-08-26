import React, { useEffect, useState } from "react";
import "./App.scss";
import Grid from "./conponents/Grid/Grid";
import StartMenu from "./conponents/StartMenu/StartMenu";
import OptionsMenu from "./conponents/OptionMenu/OptionMenu";
const audio = new Audio("/audio/tetris-theme.mp3");
audio.loop = true;

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [currentMenu, setCurrentMenu] = useState("start");
  const [activeTheme, setActiveTheme] = useState("default");

  const themes = {
    default: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #1EE682 0%, #0CA759 100%)",
      },
      tetriminoColors: {
        // Couleurs pour les tetriminos --tetrimino-I: radial-gradient(50% 50% at 50% 50%, #60E71D 0%, #41A211 100%);
          I: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        J: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        L: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        O: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        S: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        T: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        Z: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
      },
    },
    theme1: {
      backgroundColor: "#B20036",
      tetriminoColors: {
        I: "#0ff",
        J: "#00f",
        L: "#fa0",
        O: "#ff0",
        S: "#0f0",
        T: "#a0f",
        Z: "#f00",
      },
    },
    theme2: {
      backgroundColor: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
      tetriminoColors: {
        I: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        J: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        L: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        O: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        S: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        T: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
        Z: "radial-gradient(50% 50% at 50% 50%, #B20036 0%, #E67899 100%)",
      },
    },
    // Ajoutez plus de thèmes ici
  };

  useEffect(() => {
    if (isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isMusicPlaying]);
  const handleThemeToggle = (theme) => {
    setActiveTheme(theme);
  };
  const handleMusicToggle = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleStart = () => {
    setIsGameStarted(true);
  };

  const handleOptions = () => {
    setCurrentMenu("options");
  };

  const handleAccessibility = () => {
    alert("Accessibility menu - functionality not implemented yet!");
  };
  const handleHome = () => {
    setIsGameStarted(false); // Retour à la page d'accueil
    setCurrentMenu("start"); // Retour à la page d'accueil
  };
  return (
    <div className="app" style={themes[activeTheme].backgroundStyle}>
      {isGameStarted ? (
         <Grid tetriminoColors={themes[activeTheme].tetriminoColors}
          onHome={handleHome}
        />
      ) : (
        <>
          {currentMenu === "start" && (
            <StartMenu
              onStart={handleStart}
              onOptions={handleOptions}
              onAccessibility={handleAccessibility}
            />
          )}
          {currentMenu === "options" && (
            <OptionsMenu
              isMusicPlaying={isMusicPlaying}
              onMusicToggle={handleMusicToggle}
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
