import { useState } from 'react';
import { useGoogleSpeechToText } from './useGoogleSpeechToText';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const { transcription, error, isListening, startListening, stopListening } =
    useGoogleSpeechToText();
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Speech</h1>
      <div className="card">
        <div>
          {error && <p>{error.message}</p>}
          <button onClick={() => setIsStarted(!isStarted)}>
            {isStarted ? 'Stop' : 'Start'}
          </button>
          {isStarted && !isListening && (
            <button onClick={startListening}>Listen</button>
          )}
          {isListening && (
            <button onClick={stopListening}>Stop Listening</button>
          )}
          <p>{transcription}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
