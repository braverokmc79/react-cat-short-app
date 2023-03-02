import React from "react";

const MainCard = ({
  alreadyFavorite,
  mainCardImgSrc,
  onHeartClick,
  alt,
  width,
}) => {
  const EMPTY_HEART = "🤍";
  const FULL_HEART = "💖";

  const heartIcon = alreadyFavorite ? FULL_HEART : EMPTY_HEART;

  return (
    <div className="main-card">
      <img src={mainCardImgSrc} alt={alt} width={width} />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;
