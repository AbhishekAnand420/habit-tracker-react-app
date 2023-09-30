import React, { useState } from 'react';
import '../HabitTracker.css';

const HabitTracker = () => {
  const currentDate = new Date();
  const pastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }).reverse();

  const [habits, setHabits] = useState([
    { name: 'Reading', days: Array(7).fill('none') },
    { name: 'Riding', days: Array(7).fill('none') },
    { name: 'Cooking', days: Array(7).fill('none') },
    // You have three default habits: Reading, Riding, and Cooking
  ]);

  const [newHabit, setNewHabit] = useState('');

  const toggleDay = (habitIndex, dayIndex) => {
    const updatedHabits = [...habits];
    const habit = updatedHabits[habitIndex];
    const updatedDays = [...habit.days];

    if (updatedDays[dayIndex] === 'done') {
      updatedDays[dayIndex] = 'not-done';
    } else if (updatedDays[dayIndex] === 'not-done') {
      updatedDays[dayIndex] = 'none';
    } else {
      updatedDays[dayIndex] = 'done';
    }

    habit.days = updatedDays;
    updatedHabits[habitIndex] = habit;
    setHabits(updatedHabits);
  };

  const addNewHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([...habits, { name: newHabit, days: Array(7).fill('none') }]);
      setNewHabit('');
    }
  };

  const deleteHabit = (habitIndex) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(habitIndex, 1);
    setHabits(updatedHabits);
  };

  return (
    <div className="habit-tracker">
      {habits.map((habit, habitIndex) => (
        <div className="habit" key={habitIndex}>
          <h2>{habit.name}</h2>
          <div className="buttons">
            <button className="delete-button" onClick={() => deleteHabit(habitIndex)}>
              Delete
            </button>
          </div>
          <div className="days">
            {habit.days.map((status, dayIndex) => (
              <div
                className={`day ${status}`}
                key={dayIndex}
                onClick={() => toggleDay(habitIndex, dayIndex)}
              >
                {status.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="dates">
            {pastSevenDays.map((date, index) => (
              <div className="date" key={index}>
                {date}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="add-habit">
        <input 
          type="text"
          placeholder="Enter a new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addNewHabit}>Add</button>
      </div>
    </div>
  );
};

export default HabitTracker;
