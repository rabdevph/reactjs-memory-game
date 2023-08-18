import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card } from './components/Card.jsx';
import { Button } from './components/Button.jsx';

import logo from './assets/RnM.png';

const App = () => {
  const [charCount, setCharCount] = useState(6);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacers, setSelectedCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  const getData = async (count) => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/');
      const data = response.data;
      const charsArray = data.results;
      setCharacters(charsArray.slice(0, count));
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // get data on mount
    getData(charCount);
  }, [charCount]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const updateScores = () => {
    setScore((prevScore) => {
      const newScore = prevScore + 1;

      if (newScore >= bestScore) {
        setBestScore(newScore);
      }

      return newScore;
    });
  };

  const handleShuffle = () => {
    const shuffledArray = shuffleArray([...characters]);
    setCharacters(shuffledArray);
  };

  const handleClickCard = (charName) => {
    handleShuffle();
    if (selectedCharacers.includes(charName)) {
      setGameOver(true);
    } else {
      setSelectedCharacters((prevSelectedCharacters) => {
        const updatedSelectedCharacters = [...prevSelectedCharacters, charName];

        if (updatedSelectedCharacters.length === characters.length) {
          setGameOver(true);
          setWinner(true);
          setSelectedCharacters([]);
        }
        console.log(updatedSelectedCharacters);
        return updatedSelectedCharacters;
      });

      updateScores();
    }
  };

  const handleClickPlayAgain = () => {
    setGameOver(false);
    setScore(0);
    setSelectedCharacters([]);
    setWinner(false);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="title">
          <img className="logo" src={logo} alt="" />
          <p className="text">memory game</p>
        </div>
        <div className="scores">
          <p className="current-score">SCORE: {score}</p>
          <p className="best-score">BEST SCORE: {bestScore}</p>
        </div>
      </div>
      <div className="game-wrapper">
        {gameOver ? (
          <div className={`play-again  ${winner ? 'win' : 'lose'}`}>
            {winner ? (
              <p className="game-over">GAME OVER! YOU WIN!</p>
            ) : (
              <p className="game-over">GAME OVER! YOU LOSE!</p>
            )}
            <Button handleClickPlayAgain={handleClickPlayAgain} />
          </div>
        ) : (
          <div className="cards">
            {characters.map((character) => (
              <Card
                key={character.id}
                charName={character.name}
                charImage={character.image}
                handleClickCard={handleClickCard}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
