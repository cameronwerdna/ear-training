import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import './App.css';

const triads = ['major', 'minor', 'augmented', 'diminished'];
const synth = new Tone.PolySynth().toDestination();

function App() {
  const [currentTriad, setCurrentTriad] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    // Set the initial triad when the component mounts
    setCurrentTriad(getRandomTriad());
  }, []);

  const getRandomTriad = () => triads[Math.floor(Math.random() * triads.length)];

  const playTriad = () => {
    // Clear any previous notes
    synth.releaseAll();

    // Reset the result message
    setResultMessage('');

    switch (currentTriad) {
      case 'major':
        synth.triggerAttackRelease(['C4', 'E4', 'G4'], '4n');
        break;
      case 'minor':
        synth.triggerAttackRelease(['C4', 'Eb4', 'G4'], '4n');
        break;
      case 'augmented':
        synth.triggerAttackRelease(['C4', 'E4', 'Ab4'], '4n');
        break;
      case 'diminished':
        synth.triggerAttackRelease(['C4', 'Eb4', 'Gb4'], '4n');
        break;
      default:
        break;
    }
  };

  const checkGuess = (userGuess) => {
    if (userGuess === currentTriad) {
      setResultMessage('Correct! Well done.');
      setCurrentTriad(getRandomTriad());
    } else {
      setResultMessage(`Wrong. It is still a ${currentTriad} triad.`);
    }
  };

  return (
    <div>
      <h1>Musical Ear Training</h1>
      <button onClick={() => playTriad()}>Play Triad</button>
      <div id="options">
        {triads.map((triad) => (
          <button key={triad} className="option" onClick={() => checkGuess(triad)}>
            {triad}
          </button>
        ))}
      </div>
      <p id="resultMessage">{resultMessage}</p>
    </div>
  );
}

export default App;
