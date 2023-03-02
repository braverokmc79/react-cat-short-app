import React from "react";
import { CatItem } from "./CatItem";

const Favorites = ({ favorites }) => {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }

  return (
    <ul className="favorites">
      {favorites.map((cat, index) => (
        <CatItem img={cat} key={index} />
      ))}
    </ul>
  );
};

export default Favorites;
