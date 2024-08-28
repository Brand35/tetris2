import React from "react";
import "./OptionMenu.scss";

const OptionsMenu = ({
  isMusicPlaying,
  onMusicToggle,
  onHome,
  activeTheme,
  onThemeToggle,
  themes,
}) => {
  return (
    <div className="options-menu">
      <div className="theme-options">
        <h3>Choose Theme</h3>
        {Object.keys(themes).map((theme) => (
          <div key={theme} className="theme-option">
            <label className="switch">
              <input
                type="checkbox"
                checked={activeTheme === theme}
                onChange={() => onThemeToggle(theme)}
              />
              <span className="slider round"></span>
            </label>
            <span>{theme}</span>
          </div>
        ))}
      </div>
      <button className="home-button" onClick={onHome}>
        Home
      </button>
    </div>
  );
};

export default OptionsMenu;
