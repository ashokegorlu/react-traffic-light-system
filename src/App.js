import React from 'react';
import { TrafficProvider } from './components/TrafficContext/TrafficContext';
import TrafficLight from './components/TrafficLight/TrafficLight';
import './App.css';

function App() {
  return (
    <TrafficProvider>
      <div className="App">
        <TrafficLight />
      </div>
    </TrafficProvider>
  );
}

export default App;
