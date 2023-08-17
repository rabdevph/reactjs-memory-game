import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [charCount, setCharCount] = useState(10);
  const [characters, setCharacters] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character/');
      const data = response.data;
      setCharacters(data.results);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  // get data on mount
  useEffect(() => {
    getData();
  }, []);

  const gameCharacters = characters.slice(0, charCount);

  return (
    <div className="app">
      <div className="game-header">RICK AND MORTY MEMORY GAME</div>
      <div className="game">
        {gameCharacters.map((character) => (
          <div className="character-card" key={character.id}>
            <p className="character-name">{character.name}</p>
            <img className="character-image" src={character.image} alt={`${character.name}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
