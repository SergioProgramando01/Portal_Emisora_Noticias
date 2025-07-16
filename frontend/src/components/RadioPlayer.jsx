import { useState, useRef } from 'react';
import './RadioPlayer.css';

function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="radio-player-bar">
      <audio ref={audioRef} src="https://s4.radio.co/s6172605f6/listen" preload="auto"></audio>

      <button className="play-button" onClick={togglePlayPause}>
        <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
      </button>

      <div className="current-program">
        <span>**EN VIVO:** Tu programa favorito ahora mismo - Sintoniza!</span>
      </div>

      <div className="volume-control">
        <i className="fas fa-volume-up"></i>
        <input type="range" min="0" max="100" defaultValue="70" onChange={e => audioRef.current.volume = e.target.value / 100} />
      </div>
    </div>
  );
}

export default RadioPlayer;