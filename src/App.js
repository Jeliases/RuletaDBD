import React, { useState, useRef } from 'react';
import './App.css';

const killers = [
  { id: 1, name: "Animatrónico", img: "/assets/killers/animatronico.png" },
  { id: 2, name: "Arponero", img: "/assets/killers/arponero.png" },
  { id: 3, name: "Artista", img: "/assets/killers/artista.png" },
  { id: 4, name: "Bruja", img: "/assets/killers/bruja.png" },
  { id: 5, name: "Bubba", img: "/assets/killers/bubba.png" },
  { id: 6, name: "Caballero", img: "/assets/killers/caballero.png" },
  { id: 7, name: "Cazadora", img: "/assets/killers/cazadora.png" },
  { id: 8, name: "Chucky", img: "/assets/killers/chucky.png" },
  { id: 9, name: "Comerciante", img: "/assets/killers/comerciante.png" },
  { id: 10, name: "Demogorgon", img: "/assets/killers/demormorgon.png" },
  { id: 11, name: "Desconocido", img: "/assets/killers/desconocido.png" },
  { id: 12, name: "Deterioro", img: "/assets/killers/deterioro.png" },
  { id: 13, name: "Doctor", img: "/assets/killers/doctor.png" },
  { id: 14, name: "Drácula", img: "/assets/killers/dracula.png" },
  { id: 15, name: "Draga", img: "/assets/killers/draga.png" },
  { id: 16, name: "Ejecutor", img: "/assets/killers/ejecutor.png" },
  { id: 17, name: "Embaucador", img: "/assets/killers/embaucador.png" },
  { id: 18, name: "Enfermera", img: "/assets/killers/enfermera.png" },
  { id: 19, name: "Espectro", img: "/assets/killers/espectro.png" },
  { id: 20, name: "Espíritu", img: "/assets/killers/espiritu.png" },
  { id: 21, name: "Gemelos", img: "/assets/killers/gemelos.png" },
  { id: 22, name: "Jason", img: "/assets/killers/jason.png" },
  { id: 23, name: "Kaneki", img: "/assets/killers/kaneki.png" },
  { id: 24, name: "Krasue", img: "/assets/killers/Krasue.png" },
  { id: 25, name: "La Cerda", img: "/assets/killers/la cerda.png" },
  { id: 26, name: "La Pesadilla", img: "/assets/killers/la pesadilla.png" },
  { id: 27, name: "Legión", img: "/assets/killers/legion.png" },
  { id: 28, name: "Liche", img: "/assets/killers/liche.png" },
  { id: 29, name: "Michael Myers", img: "/assets/killers/Mayers.png" },
  { id: 30, name: "Némesis", img: "/assets/killers/nemesis.png" },
  { id: 31, name: "Oni", img: "/assets/killers/oni.png" },
  { id: 32, name: "Onryo", img: "/assets/killers/onryio.png" },
  { id: 33, name: "Payaso", img: "/assets/killers/payaso.png" },
  { id: 34, name: "Plaga", img: "/assets/killers/plaga.png" },
  { id: 35, name: "Pueblerino", img: "/assets/killers/pueblerino.png" },
  { id: 36, name: "Rasputia", img: "/assets/killers/Rasputia.png" },
  { id: 37, name: "Ghostface", img: "/assets/killers/scream.png" },
  { id: 38, name: "Cenobita", img: "/assets/killers/senobita.png" },
  { id: 39, name: "Singularidad", img: "/assets/killers/singularidad.png" },
  { id: 40, name: "Trampero", img: "/assets/killers/trampero.png" },
  { id: 41, name: "Vecna", img: "/assets/killers/vecna.png" },
  { id: 42, name: "Wesker", img: "/assets/killers/wesker.png" },
  { id: 43, name: "Xenomorfo", img: "/assets/killers/xenoformo.png" }
];

function App() {
  const [killersData, setKillersData] = useState(
    killers.map(k => ({ ...k, isActive: true }))
  );

  const [activeId, setActiveId] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const spinInterval = useRef(null);
  const audioRef = useRef(null);

  const isObsMode = new URLSearchParams(window.location.search).get('obs') === '1';

  const activeCount = killersData.filter(k => k.isActive).length;

  const toggleKiller = (id) => {
    if (!isEditing) return;
    setKillersData(prevData =>
      prevData.map(k => k.id === id ? { ...k, isActive: !k.isActive } : k)
    );
  };

  const setAll = (value) => {
    setKillersData(prev => prev.map(k => ({ ...k, isActive: value })));
  };

  const playGambling = () => {
    try {
      audioRef.current = new Audio('/assets/sounds/gambling.mp3');
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    } catch (e) {}
  };

  const stopGambling = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const startSpin = () => {
    const availableKillers = killersData.filter(k => k.isActive);

    if (isSpinning) return;
    if (availableKillers.length === 0) {
      alert("¡Debes tener al menos un killer activo para girar!");
      return;
    }

    setIsSpinning(true);
    setWinner(null);
    setIsEditing(false);
    playGambling();

    let currentJump = 0;
    const totalJumps = Math.floor(Math.random() * 25) + 45;
    let delay = 50;

    const activeIds = availableKillers.map(k => k.id);
    let currentIndex = 0;

    if (spinInterval.current) clearInterval(spinInterval.current);

    const jumpLight = () => {
      currentJump++;

      setActiveId(activeIds[currentIndex]);
      currentIndex = (currentIndex + 1) % activeIds.length;

      if (currentJump < totalJumps) {
        if (currentJump > totalJumps - 15) {
          delay += 35;
        } else if (currentJump > totalJumps / 2) {
          delay += 5;
        }
        setTimeout(jumpLight, delay);
      } else {
        setIsSpinning(false);
        stopGambling();
        setActiveId((finalId) => {
          const winningKiller = killersData.find(k => k.id === finalId);
          setWinner(winningKiller);
          return finalId;
        });
      }
    };

    jumpLight();
  };

  return (
    <div className={`App dark-theme ${isObsMode ? 'obs-mode' : ''}`}>
      {!isObsMode && (
        <div className="embers" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`ember ember-${i % 7}`} />
          ))}
        </div>
      )}

      <header className="top-bar">
        {!isObsMode && (
          <div className="brand">
            <span className="brand-mark">☠</span>
            <span className="brand-text">KILLER ROULETTE</span>
          </div>
        )}

        <div className="top-actions">
          {isEditing && (
            <>
              <button className="ghost-btn" onClick={() => setAll(true)}>Marcar todos</button>
              <button className="ghost-btn" onClick={() => setAll(false)}>Ninguno</button>
            </>
          )}
          <button
            className={`icon-btn ${isEditing ? 'editing' : ''}`}
            onClick={() => !isSpinning && setIsEditing(!isEditing)}
            title="Editar Killers"
          >
            {isEditing ? 'GUARDAR' : 'EDITAR'}
          </button>
        </div>
      </header>

      <main className="roulette-container">
        <div className="killer-grid">
          {killersData.map((killer) => (
            <div
              key={killer.id}
              onClick={() => toggleKiller(killer.id)}
              className={`killer-card 
                ${killer.id === activeId ? 'active' : ''} 
                ${!killer.isActive ? 'disabled' : ''}
                ${isEditing ? 'editable' : ''}
              `}
            >
              <img src={killer.img} alt={killer.name} draggable="false" />
              <span className="killer-name">{killer.name}</span>
              {isEditing && !killer.isActive && <span className="disabled-mark">✕</span>}
            </div>
          ))}
        </div>

        <div className="controls">
          {isEditing && (
            <div className="edit-hint">{activeCount} / {killers.length} activos — clic para incluir o quitar</div>
          )}

          <button
            className="spin-button"
            onClick={startSpin}
            disabled={isSpinning || isEditing}
          >
            {isSpinning ? 'BUSCANDO...' : 'TIRAR DADOS'}
          </button>

          {winner && !isSpinning && (
            <div className="winner-display">
              <span className="winner-label">Te toca jugar con</span>
              <h2>{winner.name.toUpperCase()}</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;