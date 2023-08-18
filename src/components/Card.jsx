export const Card = (props) => {
  const { charName, charImage, handleClickCard } = props;
  return (
    <div className="character-card" onClick={() => handleClickCard(charName)}>
      <img className="character-image" src={charImage} alt={`${charName}`} />
    </div>
  );
};
