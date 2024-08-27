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
    },
    theme1: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #1EE682 0%, #0CA759 100%)",
      },
    },
    theme2: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #1EE682 0%, #0CA759 100%)",
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
        />
      ) : (
        <>
          {currentMenu === "start" && (
            <StartMenu onStart={handleStart} onOptions={handleOptions} />
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
