import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleCardClick }) {
  console.log("handleCardClick in ClothesSection:", handleCardClick);

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button>Add new</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
