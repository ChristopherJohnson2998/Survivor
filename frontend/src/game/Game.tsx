/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

const Game = () => {
  const [guess, setGuess] = useState<number | string>('');
  const [message, setMessage] = useState<string>('');
  const [targetNumber, setTargetNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [attempts, setAttempts] = useState<number>(0);

  const handleGuess = () => {
    const numGuess = Number(guess);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numGuess === targetNumber) {
      setMessage(`Correct! You guessed the number in ${attempts + 1} attempts.`);
    } else if (numGuess > targetNumber) {
      setMessage('Too high! Try again.');
    } else {
      setMessage('Too low! Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-3/4 max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Guess the Number Game</h1>
        <p className="mt-4 text-lg text-center text-gray-600">Guess a number between 1 and 100!</p>

        <div className="mt-6">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg"
            placeholder="Enter your guess"
          />
        </div>

        <button
          onClick={handleGuess}
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Guess
        </button>

        <div className="mt-4 text-center">
          {message && <p className="text-xl text-gray-800">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Game;
