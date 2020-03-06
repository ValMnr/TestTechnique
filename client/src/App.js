import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PortraitCard } from './PortraitCard.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div> <PortraitCard cardMode="display" id="1" name="jean jean" thumbnail="http://i.annihil.us/u/prod/marvel/i/mg/b/70/4c0035adc7d3a/standard_large.jpg" />
      </div>
    </div>
  );
}

export default App;
