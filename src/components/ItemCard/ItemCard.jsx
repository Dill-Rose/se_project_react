import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeUnactive from "../../assets/like-unactive.svg";

function ItemCard({ item, onCardClick, onCardLike, isLiked }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = () => {
    console.log("ItemCard.jsx: handleCardLike called with item:", item);
    onCardLike({
      id: item._id,
      isLiked: isLiked,
    });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <button
          type="button"
          className={
            isLiked
              ? "card__like-button card__like-button_active"
              : "card__like-button"
          }
          onClick={handleCardLike}
        ></button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
