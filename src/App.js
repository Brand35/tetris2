import React, { useState } from "react";
import "./App.scss";
import Grid from "./conponents/Grid/Grid";
import StartMenu from "./conponents/StartMenu/StartMenu";
import OptionsMenu from "./conponents/OptionMenu/OptionMenu";
import { randomTetromino } from "./conponents/pieces/pieces";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("start");
  const [activeTheme, setActiveTheme] = useState("default");
  const nextPiece = useState(randomTetromino());
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
    black: {
      backgroundStyle: {
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

    pinkradial: {
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
    blackwhite: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #525252 0%, #373737 100%)",
      },
      tetriminoColors: {
        I: "#929292 ",
        J: "#929292 ",
        L: "#929292 ",
        O: "#929292 ",
        S: "#929292 ",
        T: "#929292 ",
        Z: "#929292 ",
      },
    },
    protanopia: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #121C3A 0%, #83899B 100%)",
      },
      tetriminoColors: {
        I: "#002CBA  ",
        J: "#18307A  ",
        L: "#121C3A  ",
        O: "#18307A  ",
        S: "#9B8A53  ",
        T: "#18307A  ",
        Z: "#6376AF  ",
      },
    },
    deuteranopia: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #B4AA89 0%, #81795F 100%)",
      },
      tetriminoColors: {
        I: "#81795F",
        J: "#2E3C6C",
        L: "#435AA7",
        O: "#504F4B",
        S: "#0023A1",
        T: "#2E3C6C",
        Z: "#999997",
      },
    },
    tritanopia: {
      backgroundStyle: {
        background:
          "radial-gradient(50% 50% at 50% 50%, #00F5DC 0%, #00B2A0 100%)",
      },
      tetriminoColors: {
        I: "#00B2A0",
        J: "#D90B1D",
        L: "#009589",
        O: "#D26E71",
        S: "#FF0006 ",
        T: "#591B25 ",
        Z: "#FF6D7A ",
      },
    },
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

  const handleHome = () => {
    setIsGameStarted(false);
    setCurrentMenu("start");
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
