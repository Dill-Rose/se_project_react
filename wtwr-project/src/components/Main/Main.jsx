import "./main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="main-cards">
        <p className="main-cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="main-cards__list">
          {defaultClothingItems.map((item) => {
            return <ItemCard key={item._id} item={item} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
