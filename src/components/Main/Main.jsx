import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleCardClick,
  handleCardLike,
  clothingItems,
  currentUser,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems
    .filter((item) => {
      return item.weather === weatherData.type;
    })
    .map((item) => {
      return (
        <ItemCard
          key={item._id}
          item={item}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          isLiked={item.likes.includes(currentUser._id)}
        />
      );
    });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} °
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">{filteredItems}</ul>
      </section>
    </main>
  );
}

export default Main;
