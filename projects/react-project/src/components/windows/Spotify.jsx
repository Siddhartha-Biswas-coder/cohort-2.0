import React from "react";
import MacWindow from "./MacWindow";
import "./spotify.scss";

const Spotify = ({ windowName, setWindowState }) => {
  return (
    <MacWindow
      width="25vw"
      windowName="spotify"
      setWindowState={setWindowState}
    >
      <div className="spotify-window">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/4kn7IFwVbNW92oDAdqCs8p?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </MacWindow>
  );
};

export default Spotify;
