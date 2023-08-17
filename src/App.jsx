import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './assets/RnM.png';

const App = () => {
  const [charCount, setCharCount] = useState(10);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacers, setSelectedCharacters] = useState([]);

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

  // shuffle characters array
  const handleShuffle = () => {
    const shuffledArray = shuffleArray([...characters]);
    setCharacters(shuffledArray);
  };

  const handleClick = (charName) => {
    // shuffle every click
    handleShuffle();
    if (selectedCharacers.includes(charName)) {
      // game over? or create attempt state for 3 chances
      console.log(`${charName} already selected.`);
    } else {
      // insert character to selected characters array
      setSelectedCharacters([...selectedCharacers, charName]);
    }
  };

  const handleKeyDown = (event, charName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(charName);
    }
  };

  console.log(selectedCharacers);
  console.log('re-render');

  return (
    <div className="app">
      <div className="game-header">
        <div className="game-title">
          <img className="logo" src={logo} alt="" />
          <p className="text">memory game</p>
        </div>
        <div className="scores">SCORES</div>
      </div>
      <div className="game">
        {characters.map((character) => (
          <div
            className="character-card"
            key={character.id}
            onClick={() => handleClick(character.name)}
            onKeyDown={(e) => handleKeyDown(e, character.name)}
            role="button"
            tabIndex="0"
          >
            <p className="character-name">{character.name}</p>
            <img className="character-image" src={character.image} alt={`${character.name}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
