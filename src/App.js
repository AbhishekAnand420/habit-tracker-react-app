import React from 'react';
import './App.css';
import HabitTracker from './components/HabitTracker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Habit Tracker</h1>
      </header>
      <main>
        <HabitTracker />
      </main>
    </div>
  );
}

export default App;
