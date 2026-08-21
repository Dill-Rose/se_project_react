import "./ItemModal.css";
import closeImage from "../../assets/union.png";
import { useContext } from "react";
import  CurrentUserContext  from "../../contexts/CurrentUserContext";

function ItemModal({ card, handleCloseClick, isOpen, handleDeleteItem }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${isOwn ? "" : "modal__delete-button_hidden"}`;

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img src={closeImage} alt="Close modal" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button
            type="button"
            onClick={() => {
              handleDeleteItem(card._id);
            }}
            className={itemDeleteButtonClassName}
          >
            Delete Item
          </button>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
