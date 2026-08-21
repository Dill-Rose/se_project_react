import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__row-text">Your Items</p>
        <button
          className="clothes-section__row-button"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
