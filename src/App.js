import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Title } from "./components/Title";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";

const App = () => {
  const [loading, setLoading] = useState(false);

  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(
      `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
    );

    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
  };

  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const [counter, setCounter] = useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCardImgSrc, setMainCardImgSrc] = useState("");
  const alreadyFavorite = favorites.includes(mainCardImgSrc);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat ");
    console.log(newCat);
    setMainCardImgSrc(newCat);
  }

  useEffect(() => {
    setInitialCat();
  }, []);

  function onHeartClick() {
    const nextFavorites = [...favorites, mainCardImgSrc];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  async function updateMainCat(value) {
    setLoading(true);
    const img = await fetchCat(value);
    setMainCardImgSrc(img);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      setTimeout(() => {
        setLoading(false);
      }, 500);

      return nextCounter;
    });
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle} 고양이 가라사대</Title>,
      <Form updateMainCat={updateMainCat} loading={loading} />
      <MainCard
        alreadyFavorite={alreadyFavorite}
        mainCardImgSrc={mainCardImgSrc}
        onHeartClick={onHeartClick}
        alt="alt"
        width="400"
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
