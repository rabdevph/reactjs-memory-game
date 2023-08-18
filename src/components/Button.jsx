export const Button = (props) => {
  const { handleClickPlayAgain } = props;
  return (
    <>
      <button className="play-again-button" tabIndex="0" onClick={handleClickPlayAgain}>
        PLAY AGAIN
      </button>
    </>
  );
};
