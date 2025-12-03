import "./ItemModal.css";
import closeImage from "../../assets/union.png";

function ItemModal({ card, handleCloseClick, isOpen, handleDeleteItem }) {
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
            className="modal__delete"
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
