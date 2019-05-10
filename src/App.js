import React from 'react';
import HanoiTowers from './HanoiTowers';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hanoi Towers</h1>
      <HanoiTowers plates={4}/>
    </div>
  );
}

export default App;